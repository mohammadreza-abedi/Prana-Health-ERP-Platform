import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import memorystore from "memorystore";
import path from "path";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";
import gamificationRoutes from "./routes/gamification";
import aiService from "./ai";
import { avatarRouter } from "./avatar-routes";
import { 
  insertUserSchema, 
  insertHealthMetricsSchema, 
  insertChallengeSchema, 
  insertUserChallengeSchema,
  insertBadgeSchema,
  insertUserBadgeSchema,
  insertEventSchema,
  insertEventParticipantSchema,
  insertDepartmentSchema,
  insertOrganizationalMetricsSchema,
  insertCreditTransactionSchema
} from "@shared/schema";
import { ZodError } from "zod";

const MemoryStore = memorystore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for checking if secrets/API keys are available
  app.post('/api/check-secrets', (req, res) => {
    const { secretKeys } = req.body;
    
    if (!Array.isArray(secretKeys)) {
      return res.status(400).json({ error: 'secretKeys must be an array' });
    }
    
    const results = secretKeys.map(key => {
      return process.env[key] !== undefined && process.env[key] !== '';
    });
    
    res.json({ results });
  });
  
  // API endpoint برای دریافت اطلاعات آب و هوا
  app.get('/api/weather', async (req, res) => {
    try {
      const { lat, lon, city } = req.query;
      
      // API Key برای سرویس Weather
      const WEATHER_API_KEY = "7c7e2a35ab3f4efbb3a115226230811";
      
      let url: string;
      
      // اگر مختصات جغرافیایی داده شده باشد، از آنها استفاده می‌کنیم
      if (lat && lon) {
        url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=yes&alerts=no&lang=fa`;
      } 
      // اگر نام شهر داده شده باشد، از آن استفاده می‌کنیم
      else if (city) {
        url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(String(city))}&days=1&aqi=yes&alerts=no&lang=fa`;
      } else {
        return res.status(400).json({ 
          error: "حداقل یکی از پارامترهای لازم باید ارسال شود: مختصات جغرافیایی (lat, lon) یا نام شهر (city)"
        });
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({
          error: errorData.error?.message || "خطا در دریافت اطلاعات آب و هوا"
        });
      }
      
      const weatherData = await response.json();
      
      // بهینه‌سازی داده‌ها برای ارسال به کلاینت (کاهش حجم داده)
      const optimizedData = {
        location: {
          name: weatherData.location.name,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          localtime: weatherData.location.localtime,
          tz_id: weatherData.location.tz_id,
        },
        current: {
          temp_c: weatherData.current.temp_c,
          condition: weatherData.current.condition,
          humidity: weatherData.current.humidity,
          feelslike_c: weatherData.current.feelslike_c,
          wind_kph: weatherData.current.wind_kph,
          wind_dir: weatherData.current.wind_dir,
          uv: weatherData.current.uv,
          air_quality: weatherData.current.air_quality,
          is_day: weatherData.current.is_day,
          last_updated: weatherData.current.last_updated,
        },
        forecast: weatherData.forecast ? {
          forecastday: weatherData.forecast.forecastday.map((day: any) => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              condition: day.day.condition,
            },
            astro: {
              sunrise: day.astro.sunrise,
              sunset: day.astro.sunset,
            }
          }))
        } : undefined
      };
      
      res.json(optimizedData);
    } catch (error: any) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        error: "خطا در سرور هنگام دریافت اطلاعات آب و هوا" 
      });
    }
  });
  // Set up session middleware
  app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'prana-health-assistant-secret'
  }));

  // Auth middleware
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

  const requireRole = (roles: string[]) => (req: Request, res: Response, next: Function) => {
    if (!req.session.userId || !req.session.userRole) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!roles.includes(req.session.userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };

  // Error handler for zod validation
  const validateSchema = (schema: any, data: any) => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = error.format();
        throw { status: 400, message: 'Validation Error', errors: formattedError };
      }
      throw error;
    }
  };

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // بدون نیاز به بررسی رمز عبور، وارد سیستم شوید
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/me', async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: 'Not logged in' });
      }
      
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // مسیر جدید برای ورود خودکار با یک نام کاربری
  app.get('/api/auth/auto-login/:username', async (req, res) => {
    try {
      const username = req.params.username;
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // ورود خودکار
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // User routes
  app.post('/api/users', async (req, res) => {
    try {
      const userData = validateSchema(insertUserSchema, req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      
      const user = await storage.createUser(userData);
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        level: user.level,
        xp: user.xp,
        role: user.role
      });
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  // مسیر API برای دریافت نمونه کاربران برای ورود خودکار
  app.get('/api/users/sample', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      
      // ساخت لیست کاربران با حذف اطلاعات حساس
      const sampleUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        role: user.role
      }));
      
      res.json(sampleUsers);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/api/users/:id', requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Health metrics routes
  app.get('/api/health-metrics', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const date = req.query.date as string | undefined;
      
      const metrics = await storage.getHealthMetricsByUserId(userId, date);
      
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/health-metrics', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const metricData = validateSchema(insertHealthMetricsSchema, { ...req.body, userId });
      
      const metric = await storage.createHealthMetric(metricData);
      
      res.status(201).json(metric);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.put('/api/health-metrics/:id', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const metricId = parseInt(req.params.id);
      
      const metric = await storage.updateHealthMetric(metricId, req.body);
      
      if (!metric) {
        return res.status(404).json({ message: 'Metric not found' });
      }
      
      if (metric.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      res.json(metric);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Challenge routes
  app.get('/api/challenges', requireAuth, async (req, res) => {
    try {
      const challenges = await storage.getAllChallenges();
      
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/challenges', requireRole(['admin']), async (req, res) => {
    try {
      const challengeData = validateSchema(insertChallengeSchema, req.body);
      
      const challenge = await storage.createChallenge(challengeData);
      
      res.status(201).json(challenge);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  // User challenges routes
  app.get('/api/user-challenges', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      
      const userChallenges = await storage.getUserChallengesByUserId(userId);
      
      res.json(userChallenges);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/user-challenges', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const userChallengeData = validateSchema(insertUserChallengeSchema, { ...req.body, userId });
      
      const userChallenge = await storage.createUserChallenge(userChallengeData);
      
      res.status(201).json(userChallenge);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.put('/api/user-challenges/:id', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const userChallengeId = parseInt(req.params.id);
      
      const userChallenge = await storage.updateUserChallenge(userChallengeId, req.body);
      
      if (!userChallenge) {
        return res.status(404).json({ message: 'User challenge not found' });
      }
      
      if (userChallenge.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      res.json(userChallenge);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Badge routes
  app.get('/api/badges', requireAuth, async (req, res) => {
    try {
      const badges = await storage.getAllBadges();
      
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/badges', requireRole(['admin']), async (req, res) => {
    try {
      const badgeData = validateSchema(insertBadgeSchema, req.body);
      
      const badge = await storage.createBadge(badgeData);
      
      res.status(201).json(badge);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  // User badges routes
  app.get('/api/user-badges', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      
      const userBadges = await storage.getUserBadgesByUserId(userId);
      
      res.json(userBadges);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/user-badges', requireRole(['admin']), async (req, res) => {
    try {
      const userBadgeData = validateSchema(insertUserBadgeSchema, req.body);
      
      const userBadge = await storage.createUserBadge(userBadgeData);
      
      res.status(201).json(userBadge);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Event routes
  app.get('/api/events', requireAuth, async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/events', requireRole(['admin', 'hr', 'hse']), async (req, res) => {
    try {
      const eventData = validateSchema(insertEventSchema, req.body);
      
      const event = await storage.createEvent(eventData);
      
      res.status(201).json(event);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/api/events/:id/participants', requireAuth, async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      
      const participants = await storage.getEventParticipants(eventId);
      
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/events/:id/join', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const eventId = parseInt(req.params.id);
      
      const data = { userId, eventId };
      
      validateSchema(insertEventParticipantSchema, data);
      
      const participant = await storage.joinEvent(data);
      
      res.status(201).json(participant);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.delete('/api/events/:id/leave', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const eventId = parseInt(req.params.id);
      
      const success = await storage.leaveEvent(eventId, userId);
      
      if (!success) {
        return res.status(404).json({ message: 'Participation not found' });
      }
      
      res.json({ message: 'Left event successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Department routes
  app.get('/api/departments', requireAuth, async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/departments', requireRole(['admin', 'hr']), async (req, res) => {
    try {
      const departmentData = validateSchema(insertDepartmentSchema, req.body);
      
      const department = await storage.createDepartment(departmentData);
      
      res.status(201).json(department);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/api/departments/:id/members', requireRole(['admin', 'hr', 'hse']), async (req, res) => {
    try {
      const departmentId = parseInt(req.params.id);
      
      const members = await storage.getDepartmentMembers(departmentId);
      
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Organizational metrics routes
  app.get('/api/organizational-metrics', requireRole(['admin', 'hr', 'hse']), async (req, res) => {
    try {
      const departmentId = parseInt(req.query.departmentId as string);
      const date = req.query.date as string | undefined;
      
      if (isNaN(departmentId)) {
        return res.status(400).json({ message: 'Department ID is required' });
      }
      
      const metrics = await storage.getOrganizationalMetrics(departmentId, date);
      
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/organizational-metrics', requireRole(['admin', 'hr', 'hse']), async (req, res) => {
    try {
      const metricData = validateSchema(insertOrganizationalMetricsSchema, req.body);
      
      const metric = await storage.createOrganizationalMetric(metricData);
      
      res.status(201).json(metric);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).json(error);
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Credit transactions routes
  app.get('/api/credits', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const credits = await storage.getUserCredits(userId);
      
      res.json({ credits });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/api/credit-transactions', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const transactions = await storage.getUserCreditTransactions(userId, limit);
      
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/credit-transactions', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { amount, actionType, description, resourceId, resourceType } = req.body;
      
      if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a number' });
      }
      
      if (!actionType || !description) {
        return res.status(400).json({ message: 'Action type and description are required' });
      }
      
      const result = await storage.updateUserCredits(
        userId,
        amount,
        actionType,
        description,
        resourceId,
        resourceType
      );
      
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Insufficient credits') {
        return res.status(403).json({ message: 'Insufficient credits' });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  // Leaderboard route
  app.get('/api/leaderboard', requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const leaderboard = await storage.getLeaderboard(limit);
      
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // سرو فایل HTML ورود اتوماتیک
  app.get('/auto-login', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client/public/auto-login.html'));
  });

  // Advanced Gamification Routes
  // Use our gamification router with Express sessions, not Passport sessions
  app.use('/api/gamification', (req: any, res: any, next: any) => {
    // Add session userId to req.user to make it compatible with our gamification router
    if (req.session.userId) {
      req.user = { id: req.session.userId };
    }
    next();
  }, gamificationRoutes);

  // Credit API routes
  app.get('/api/credits/balance', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const credits = await storage.getUserCredits(userId);
      
      res.json(credits);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/api/credits/transactions', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const transactions = await storage.getUserCreditTransactions(userId, limit);
      
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/credits/add', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { amount, actionType, description, resourceId, resourceType } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
      }
      
      if (!actionType || !description) {
        return res.status(400).json({ message: 'Action type and description are required' });
      }
      
      const result = await storage.updateUserCredits(
        userId,
        amount,
        actionType,
        description,
        resourceId,
        resourceType
      );
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/credits/spend', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { amount, actionType, description, resourceId, resourceType } = req.body;
      
      if (!amount || amount >= 0) {
        return res.status(400).json({ message: 'Amount must be negative for spending' });
      }
      
      if (!actionType || !description) {
        return res.status(400).json({ message: 'Action type and description are required' });
      }
      
      // First check if user has enough credits
      const currentCredits = await storage.getUserCredits(userId);
      if (currentCredits < Math.abs(amount)) {
        return res.status(400).json({ message: 'Insufficient credits' });
      }
      
      const result = await storage.updateUserCredits(
        userId,
        amount,
        actionType,
        description,
        resourceId,
        resourceType
      );
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/credits/convert-xp', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { xpAmount } = req.body;
      
      if (!xpAmount || xpAmount <= 0 || !Number.isInteger(xpAmount)) {
        return res.status(400).json({ message: 'Invalid XP amount' });
      }
      
      // Get the user to check their XP
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (user.xp < xpAmount) {
        return res.status(400).json({ message: 'Insufficient XP' });
      }
      
      // Calculate credit amount (1 credit per 10 XP)
      const creditsAmount = Math.floor(xpAmount / 10);
      
      // First reduce user's XP
      const updatedUser = await storage.updateUser(userId, {
        xp: user.xp - xpAmount,
      });
      
      if (!updatedUser) {
        return res.status(500).json({ message: 'Failed to update user XP' });
      }
      
      // Then add credits
      const creditResult = await storage.updateUserCredits(
        userId,
        creditsAmount,
        'XP_CONVERT',
        `تبدیل ${xpAmount} امتیاز تجربه به ${creditsAmount} اعتبار`
      );
      
      res.json({ 
        xpAmount, 
        creditsAmount,
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          displayName: updatedUser.displayName,
          avatar: updatedUser.avatar,
          level: updatedUser.level,
          xp: updatedUser.xp,
          role: updatedUser.role
        },
        transaction: creditResult.transaction 
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // سرو فایل‌های استاتیک
  app.use('/assets', express.static(path.resolve(process.cwd(), 'client/public/assets')));
  
  // API endpoints for AI analysis
  app.post('/api/ai/analyze', requireAuth, async (req, res) => {
    try {
      const { prompt, data, options } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          error: "پرامپت برای تحلیل با هوش مصنوعی ضروری است" 
        });
      }
      
      const result = await aiService.analyzeWithAI(prompt, data || {}, options || {});
      res.json(result);
    } catch (error: any) {
      console.error("AI API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در تحلیل با هوش مصنوعی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  app.post('/api/ai/analyze-image', requireAuth, async (req, res) => {
    try {
      const { prompt, imageBase64, options } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          error: "پرامپت برای تحلیل تصویر ضروری است" 
        });
      }
      
      if (!imageBase64) {
        return res.status(400).json({ 
          error: "تصویر برای تحلیل ضروری است (در فرمت base64)" 
        });
      }
      
      const result = await aiService.analyzeImageWithAI(prompt, imageBase64, options || {});
      res.json(result);
    } catch (error: any) {
      console.error("AI Image API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در تحلیل تصویر با هوش مصنوعی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  app.post('/api/ai/generate-content', requireAuth, async (req, res) => {
    try {
      const { prompt, options } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ 
          error: "پرامپت برای تولید محتوا ضروری است" 
        });
      }
      
      const result = await aiService.generateContentWithAI(prompt, options || {});
      res.json(result);
    } catch (error: any) {
      console.error("AI Content Generation API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در تولید محتوا با هوش مصنوعی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  app.post('/api/ai/predict-trends', requireAuth, async (req, res) => {
    try {
      const { data, timeframe, options } = req.body;
      
      if (!data) {
        return res.status(400).json({ 
          error: "داده‌های تاریخی برای پیش‌بینی روند ضروری است" 
        });
      }
      
      const result = await aiService.predictTrendsWithAI(data, timeframe || 'next quarter', options || {});
      res.json(result);
    } catch (error: any) {
      console.error("AI Trend Prediction API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در پیش‌بینی روند با هوش مصنوعی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  app.post('/api/ai/analyze-text', requireAuth, async (req, res) => {
    try {
      const { text, analysisType, options } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: "متن برای تحلیل ضروری است" 
        });
      }
      
      const result = await aiService.analyzeTextWithAI(
        text, 
        analysisType || 'general', 
        options || {}
      );
      res.json(result);
    } catch (error: any) {
      console.error("AI Text Analysis API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در تحلیل متن با هوش مصنوعی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  // API endpoint for health insights with AI
  app.post('/api/ai/health-insights', requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { customData } = req.body;
      
      // Get user's health metrics
      const healthMetrics = await storage.getHealthMetricsByUserId(userId);
      
      // Combine with custom data if provided
      const analysisData = {
        healthMetrics,
        ...(customData || {})
      };
      
      const result = await aiService.analyzeWithAI(
        'تحلیل وضعیت سلامت کاربر و ارائه توصیه‌های بهبود بر اساس داده‌های سلامت موجود',
        analysisData,
        { 
          format: 'json',
          temperature: 0.3,
          model: 'gpt-4o'
        }
      );
      
      res.json(result);
    } catch (error: any) {
      console.error("Health Insights API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در دریافت بینش‌های سلامت",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });
  
  // API endpoint for organizational performance analysis with AI
  app.post('/api/ai/org-performance', requireRole(['admin', 'hr', 'hse']), async (req, res) => {
    try {
      const { departmentId, timeframe, customData } = req.body;
      
      if (!departmentId) {
        return res.status(400).json({ 
          error: "شناسه دپارتمان برای تحلیل عملکرد سازمانی ضروری است" 
        });
      }
      
      // Get organizational metrics
      const orgMetrics = await storage.getOrganizationalMetrics(departmentId, timeframe);
      
      // Get department members
      const members = await storage.getDepartmentMembers(departmentId);
      
      // Combine data for analysis
      const analysisData = {
        departmentId,
        timeframe,
        orgMetrics,
        members,
        ...(customData || {})
      };
      
      const result = await aiService.analyzeWithAI(
        'تحلیل عملکرد سازمانی و ارائه راهکارهای بهبود برای این دپارتمان',
        analysisData,
        { 
          format: 'json',
          temperature: 0.2,
          model: 'gpt-4o'
        }
      );
      
      res.json(result);
    } catch (error: any) {
      console.error("Org Performance API error:", error);
      res.status(500).json({ 
        error: error.message || "خطا در تحلیل عملکرد سازمانی",
        code: error.code || "UNKNOWN_ERROR" 
      });
    }
  });

  // ثبت مسیرهای مربوط به آواتار
  app.use('/api', avatarRouter);

  const httpServer = createServer(app);

  // WebSocket Server Implementation - با پیاده‌سازی بسیار ساده و مستقیم (بدون پیچیدگی)
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws',
    clientTracking: true
  });

  // یک پیاده‌سازی حداقلی برای رفع مشکل وب‌سوکت
  const clients: { [key: string]: { 
    ws: WebSocket, 
    userId?: number, 
    username?: string
  }} = {};
  
  // پاک کردن مشتریانی که دیگر متصل نیستند
  setInterval(() => {
    for (const clientId in clients) {
      const client = clients[clientId];
      if (client.ws.readyState !== WebSocket.OPEN) {
        console.log(`Cleaning up disconnected client: ${clientId}`);
        delete clients[clientId];
      }
    }
  }, 60000); // هر یک دقیقه بررسی کن
  
  // WebSocket connection handler
  wss.on('connection', (ws) => {
    // Generate a unique ID for this connection
    const clientId = Math.random().toString(36).substring(2, 15);
    clients[clientId] = { ws };
    
    console.log(`New WebSocket connection established: ${clientId}`);
    
    // Send welcome message
    try {
      ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to پرانا (Prana) WebSocket Server',
        clientId
      }));
    } catch (error) {
      console.error('Error sending welcome message:', error);
    }
    
    // Handle incoming messages with simple error handling
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log(`Received message from ${clientId}:`, data.type);
        
        // Handle different message types
        switch (data.type) {
          case 'auth':
            // Authenticate user
            if (data.userId && data.username) {
              clients[clientId] = { 
                ...clients[clientId],
                userId: data.userId, 
                username: data.username
              };
              
              try {
                ws.send(JSON.stringify({
                  type: 'auth',
                  status: 'success',
                  message: 'Authentication successful'
                }));
                
                // Notify all users of new user online
                broadcastToAll({
                  type: 'user_status',
                  status: 'online',
                  userId: data.userId,
                  username: data.username
                }, clientId);
              } catch (error) {
                console.error('Error in auth response:', error);
              }
            }
            break;
            
          case 'health_update':
            // Handle real-time health data updates
            if (data.metric && clients[clientId]?.userId) {
              // Broadcast to HR/admin users (all authenticated users for simplicity)
              broadcastToAllAuthenticated({
                type: 'health_data',
                userId: clients[clientId].userId,
                username: clients[clientId].username,
                timestamp: new Date(),
                data: data.metric
              });
              
              try {
                ws.send(JSON.stringify({
                  type: 'health_update',
                  status: 'success',
                  message: 'Health data updated successfully'
                }));
              } catch (error) {
                console.error('Error in health update response:', error);
              }
            }
            break;
            
          case 'notification':
            // Handle sending notifications to specific users
            if (data.targetUserId && data.message) {
              sendToUser(data.targetUserId, {
                type: 'notification',
                message: data.message,
                sender: clients[clientId]?.username || 'System',
                timestamp: new Date()
              });
              
              try {
                ws.send(JSON.stringify({
                  type: 'notification',
                  status: 'success',
                  message: 'Notification sent successfully'
                }));
              } catch (error) {
                console.error('Error in notification response:', error);
              }
            }
            break;
            
          case 'challenge_progress':
            // Handle real-time challenge progress updates
            if (data.challengeId && data.progress && clients[clientId]?.userId) {
              // Notify all users about the challenge progress
              broadcastToAll({
                type: 'challenge_update',
                userId: clients[clientId].userId,
                username: clients[clientId].username,
                challengeId: data.challengeId,
                progress: data.progress,
                timestamp: new Date()
              });
            }
            break;
            
          case 'ping':
            // Simple ping-pong to keep connection alive
            try {
              ws.send(JSON.stringify({
                type: 'pong',
                timestamp: new Date()
              }));
            } catch (error) {
              console.error('Error in ping response:', error);
            }
            break;
            
          default:
            try {
              ws.send(JSON.stringify({
                type: 'error',
                message: 'Unknown message type'
              }));
            } catch (error) {
              console.error('Error in default response:', error);
            }
        }
        
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        try {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Failed to process message'
          }));
        } catch (sendError) {
          console.error('Error sending error message:', sendError);
        }
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      const clientInfo = clients[clientId];
      
      if (clientInfo && clientInfo.userId) {
        // Notify all users that this user is offline
        broadcastToAll({
          type: 'user_status',
          status: 'offline',
          userId: clientInfo.userId,
          username: clientInfo.username
        });
      }
      
      // Remove client from connected clients
      delete clients[clientId];
      console.log(`WebSocket connection closed: ${clientId}`);
    });
    
    // Handle errors
    ws.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
      // Remove client from connected clients on error
      delete clients[clientId];
    });
  });
  
  // Helper functions for WebSocket communication
  
  // Send message to a specific user - simplified version
  function sendToUser(userId: number, message: any) {
    for (const clientId in clients) {
      const client = clients[clientId];
      if (client.userId === userId && client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(JSON.stringify(message));
          return true;
        } catch (err) {
          console.error(`Error sending message to user ${userId}:`, err);
        }
      }
    }
    return false;
  }
  
  // Broadcast message to all authenticated users
  function broadcastToAllAuthenticated(message: any) {
    for (const clientId in clients) {
      const client = clients[clientId];
      if (client.userId && client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(JSON.stringify(message));
        } catch (err) {
          console.error(`Error broadcasting to authenticated client ${clientId}:`, err);
        }
      }
    }
  }
  
  // Broadcast message to all connected clients - simplified version
  function broadcastToAll(message: any, excludeClientId?: string) {
    for (const clientId in clients) {
      if ((!excludeClientId || clientId !== excludeClientId)) {
        const client = clients[clientId];
        if (client.ws.readyState === WebSocket.OPEN) {
          try {
            client.ws.send(JSON.stringify(message));
          } catch (err) {
            console.error(`Error broadcasting to client ${clientId}:`, err);
          }
        }
      }
    }
  }

  return httpServer;
}
