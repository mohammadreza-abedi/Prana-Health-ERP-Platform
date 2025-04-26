import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import memorystore from "memorystore";
import { storage } from "./storage";
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
  insertOrganizationalMetricsSchema
} from "@shared/schema";
import { ZodError } from "zod";

const MemoryStore = memorystore(session);

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
