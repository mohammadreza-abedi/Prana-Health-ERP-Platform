import {
  User, InsertUser, HealthMetric, InsertHealthMetric,
  Challenge, InsertChallenge, UserChallenge, InsertUserChallenge,
  Badge, InsertBadge, UserBadge, InsertUserBadge,
  Event, InsertEvent, EventParticipant, InsertEventParticipant,
  Department, InsertDepartment, DepartmentMember, InsertDepartmentMember,
  OrganizationalMetric, InsertOrganizationalMetric
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Health metrics operations
  getHealthMetricsByUserId(userId: number, date?: string): Promise<HealthMetric[]>;
  createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric>;
  updateHealthMetric(id: number, data: Partial<HealthMetric>): Promise<HealthMetric | undefined>;
  
  // Challenge operations
  getAllChallenges(): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // User challenge operations
  getUserChallengesByUserId(userId: number): Promise<(UserChallenge & { challenge: Challenge })[]>;
  createUserChallenge(userChallenge: InsertUserChallenge): Promise<UserChallenge>;
  updateUserChallenge(id: number, data: Partial<UserChallenge>): Promise<UserChallenge | undefined>;
  
  // Badge operations
  getAllBadges(): Promise<Badge[]>;
  getBadge(id: number): Promise<Badge | undefined>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  
  // User badge operations
  getUserBadgesByUserId(userId: number): Promise<(UserBadge & { badge: Badge })[]>;
  createUserBadge(userBadge: InsertUserBadge): Promise<UserBadge>;
  
  // Event operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getEventParticipants(eventId: number): Promise<User[]>;
  
  // Event participant operations
  joinEvent(data: InsertEventParticipant): Promise<EventParticipant>;
  leaveEvent(eventId: number, userId: number): Promise<boolean>;
  
  // Department operations
  getAllDepartments(): Promise<Department[]>;
  getDepartment(id: number): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  getDepartmentMembers(departmentId: number): Promise<User[]>;
  
  // Organizational metrics operations
  getOrganizationalMetrics(departmentId: number, date?: string): Promise<OrganizationalMetric[]>;
  createOrganizationalMetric(metric: InsertOrganizationalMetric): Promise<OrganizationalMetric>;
  
  // Leaderboard operations
  getLeaderboard(limit?: number): Promise<{ id: number; displayName: string; avatar?: string; xp: number; level: number }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthMetrics: Map<number, HealthMetric>;
  private challenges: Map<number, Challenge>;
  private userChallenges: Map<number, UserChallenge>;
  private badges: Map<number, Badge>;
  private userBadges: Map<number, UserBadge>;
  private events: Map<number, Event>;
  private eventParticipants: Map<number, EventParticipant>;
  private departments: Map<number, Department>;
  private departmentMembers: Map<number, DepartmentMember>;
  private organizationalMetrics: Map<number, OrganizationalMetric>;
  
  private userIdCounter: number;
  private healthMetricIdCounter: number;
  private challengeIdCounter: number;
  private userChallengeIdCounter: number;
  private badgeIdCounter: number;
  private userBadgeIdCounter: number;
  private eventIdCounter: number;
  private eventParticipantIdCounter: number;
  private departmentIdCounter: number;
  private departmentMemberIdCounter: number;
  private organizationalMetricIdCounter: number;

  constructor() {
    this.users = new Map();
    this.healthMetrics = new Map();
    this.challenges = new Map();
    this.userChallenges = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    this.events = new Map();
    this.eventParticipants = new Map();
    this.departments = new Map();
    this.departmentMembers = new Map();
    this.organizationalMetrics = new Map();
    
    this.userIdCounter = 1;
    this.healthMetricIdCounter = 1;
    this.challengeIdCounter = 1;
    this.userChallengeIdCounter = 1;
    this.badgeIdCounter = 1;
    this.userBadgeIdCounter = 1;
    this.eventIdCounter = 1;
    this.eventParticipantIdCounter = 1;
    this.departmentIdCounter = 1;
    this.departmentMemberIdCounter = 1;
    this.organizationalMetricIdCounter = 1;
    
    // Seed some initial data
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Health metrics methods
  async getHealthMetricsByUserId(userId: number, date?: string): Promise<HealthMetric[]> {
    return Array.from(this.healthMetrics.values()).filter(
      (metric) => metric.userId === userId &&
        (!date || metric.date.toISOString().split('T')[0] === date)
    );
  }

  async createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.healthMetricIdCounter++;
    const healthMetric: HealthMetric = {
      ...metric,
      id,
      createdAt: new Date()
    };
    this.healthMetrics.set(id, healthMetric);
    return healthMetric;
  }

  async updateHealthMetric(id: number, data: Partial<HealthMetric>): Promise<HealthMetric | undefined> {
    const metric = this.healthMetrics.get(id);
    if (!metric) return undefined;
    
    const updatedMetric = { ...metric, ...data };
    this.healthMetrics.set(id, updatedMetric);
    return updatedMetric;
  }

  // Challenge methods
  async getAllChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const id = this.challengeIdCounter++;
    const newChallenge: Challenge = {
      ...challenge,
      id,
      createdAt: new Date()
    };
    this.challenges.set(id, newChallenge);
    return newChallenge;
  }

  // User challenge methods
  async getUserChallengesByUserId(userId: number): Promise<(UserChallenge & { challenge: Challenge })[]> {
    const userChallenges = Array.from(this.userChallenges.values()).filter(
      (uc) => uc.userId === userId
    );
    
    return userChallenges.map(uc => {
      const challenge = this.challenges.get(uc.challengeId)!;
      return { ...uc, challenge };
    });
  }

  async createUserChallenge(userChallenge: InsertUserChallenge): Promise<UserChallenge> {
    const id = this.userChallengeIdCounter++;
    const newUserChallenge: UserChallenge = {
      ...userChallenge,
      id,
      createdAt: new Date()
    };
    this.userChallenges.set(id, newUserChallenge);
    return newUserChallenge;
  }

  async updateUserChallenge(id: number, data: Partial<UserChallenge>): Promise<UserChallenge | undefined> {
    const userChallenge = this.userChallenges.get(id);
    if (!userChallenge) return undefined;
    
    const updatedUserChallenge = { ...userChallenge, ...data };
    this.userChallenges.set(id, updatedUserChallenge);
    return updatedUserChallenge;
  }

  // Badge methods
  async getAllBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getBadge(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }

  async createBadge(badge: InsertBadge): Promise<Badge> {
    const id = this.badgeIdCounter++;
    const newBadge: Badge = {
      ...badge,
      id,
      createdAt: new Date()
    };
    this.badges.set(id, newBadge);
    return newBadge;
  }

  // User badge methods
  async getUserBadgesByUserId(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    const userBadges = Array.from(this.userBadges.values()).filter(
      (ub) => ub.userId === userId
    );
    
    return userBadges.map(ub => {
      const badge = this.badges.get(ub.badgeId)!;
      return { ...ub, badge };
    });
  }

  async createUserBadge(userBadge: InsertUserBadge): Promise<UserBadge> {
    const id = this.userBadgeIdCounter++;
    const newUserBadge: UserBadge = {
      ...userBadge,
      id,
      createdAt: new Date()
    };
    this.userBadges.set(id, newUserBadge);
    return newUserBadge;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const newEvent: Event = {
      ...event,
      id,
      createdAt: new Date()
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async getEventParticipants(eventId: number): Promise<User[]> {
    const participants = Array.from(this.eventParticipants.values())
      .filter(ep => ep.eventId === eventId)
      .map(ep => this.users.get(ep.userId)!);
    
    return participants;
  }

  // Event participant methods
  async joinEvent(data: InsertEventParticipant): Promise<EventParticipant> {
    const id = this.eventParticipantIdCounter++;
    const newEventParticipant: EventParticipant = {
      ...data,
      id,
      createdAt: new Date()
    };
    this.eventParticipants.set(id, newEventParticipant);
    return newEventParticipant;
  }

  async leaveEvent(eventId: number, userId: number): Promise<boolean> {
    const participant = Array.from(this.eventParticipants.values()).find(
      ep => ep.eventId === eventId && ep.userId === userId
    );
    
    if (!participant) return false;
    
    this.eventParticipants.delete(participant.id);
    return true;
  }

  // Department methods
  async getAllDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async getDepartment(id: number): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  async createDepartment(department: InsertDepartment): Promise<Department> {
    const id = this.departmentIdCounter++;
    const newDepartment: Department = {
      ...department,
      id,
      createdAt: new Date()
    };
    this.departments.set(id, newDepartment);
    return newDepartment;
  }

  async getDepartmentMembers(departmentId: number): Promise<User[]> {
    const members = Array.from(this.departmentMembers.values())
      .filter(dm => dm.departmentId === departmentId)
      .map(dm => this.users.get(dm.userId)!);
    
    return members;
  }

  // Organizational metrics methods
  async getOrganizationalMetrics(departmentId: number, date?: string): Promise<OrganizationalMetric[]> {
    return Array.from(this.organizationalMetrics.values()).filter(
      (metric) => metric.departmentId === departmentId &&
        (!date || metric.date.toISOString().split('T')[0] === date)
    );
  }

  async createOrganizationalMetric(metric: InsertOrganizationalMetric): Promise<OrganizationalMetric> {
    const id = this.organizationalMetricIdCounter++;
    const newMetric: OrganizationalMetric = {
      ...metric,
      id,
      createdAt: new Date()
    };
    this.organizationalMetrics.set(id, newMetric);
    return newMetric;
  }

  // Leaderboard methods
  async getLeaderboard(limit: number = 10): Promise<{ id: number; displayName: string; avatar?: string; xp: number; level: number }[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit)
      .map(({ id, displayName, avatar, xp, level }) => ({
        id, displayName, avatar, xp, level
      }));
  }

  // Seed initial data for testing
  private seedData() {
    // Seed users
    const users: InsertUser[] = [
      { username: 'amir', password: 'password', displayName: 'امیر محمدی', role: 'user', level: 3, xp: 750, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80' },
      { username: 'hamid', password: 'password', displayName: 'حمید', role: 'user', level: 5, xp: 950, avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80' },
      { username: 'sara', password: 'password', displayName: 'سارا', role: 'user', level: 4, xp: 820, avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=48&q=80' },
      { username: 'reza', password: 'password', displayName: 'رضا', role: 'user', level: 3, xp: 760, avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=48&q=80' },
      { username: 'maryam', password: 'password', displayName: 'مریم', role: 'user', level: 3, xp: 710, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&q=80' },
      { username: 'ali', password: 'password', displayName: 'علی', role: 'user', level: 3, xp: 680, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&q=80' },
      { username: 'hrmanager', password: 'password', displayName: 'مدیر منابع انسانی', role: 'hr', level: 1, xp: 100 },
      { username: 'hsemanager', password: 'password', displayName: 'مدیر HSE', role: 'hse', level: 1, xp: 100 },
    ];
    
    users.forEach(user => {
      this.createUser(user);
    });

    // Seed challenges
    const challenges: InsertChallenge[] = [
      { 
        title: '۲۰ دقیقه فعالیت ذهنی', 
        description: 'تمرکز و مدیتیشن برای آرامش بیشتر', 
        type: 'mental', 
        points: 50, 
        targetValue: 20, 
        icon: 'clock' 
      },
      { 
        title: 'ارسال گزارش امروز', 
        description: 'گزارش فعالیت‌های امروز را ارسال کنید', 
        type: 'work', 
        points: 30, 
        targetValue: 1, 
        icon: 'mail' 
      },
      { 
        title: '۱۰۰۰۰ قدم روزانه', 
        description: 'پیاده‌روی برای سلامت قلب و عروق', 
        type: 'physical', 
        points: 70, 
        targetValue: 10000, 
        icon: 'footprints' 
      },
      { 
        title: '۲ لیتر آب روزانه', 
        description: 'نوشیدن آب کافی برای حفظ سلامت', 
        type: 'nutrition', 
        points: 40, 
        targetValue: 2000, 
        icon: 'droplet' 
      }
    ];
    
    challenges.forEach(challenge => {
      this.createChallenge(challenge);
    });

    // Seed badges
    const badges: InsertBadge[] = [
      { 
        name: 'قهرمان قدم‌های روزانه', 
        description: '۷ روز متوالی ۱۰۰۰۰ قدم پیاده‌روی', 
        icon: 'star', 
        category: 'steps', 
        requirement: '7_days_10000_steps' 
      },
      { 
        name: 'متخصص مدیریت استرس', 
        description: '۳۰ روز حفظ سطح استرس پایین', 
        icon: 'shield', 
        category: 'mental', 
        requirement: '30_days_low_stress' 
      },
      { 
        name: 'متخصص تغذیه', 
        description: 'تکمیل ۵ چالش تغذیه‌ای', 
        icon: 'coins', 
        category: 'nutrition', 
        requirement: '5_nutrition_challenges' 
      }
    ];
    
    badges.forEach(badge => {
      this.createBadge(badge);
    });

    // Seed user badges
    const userBadges: InsertUserBadge[] = [
      { userId: 1, badgeId: 1, earnedDate: new Date() },
      { userId: 1, badgeId: 2, earnedDate: new Date() }
    ];
    
    userBadges.forEach(userBadge => {
      this.createUserBadge(userBadge);
    });

    // Seed user challenges
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const userChallenges: InsertUserChallenge[] = [
      { 
        userId: 1, 
        challengeId: 1, 
        startDate: today, 
        endDate: tomorrow, 
        currentValue: 15, 
        completed: false 
      },
      { 
        userId: 1, 
        challengeId: 2, 
        startDate: today, 
        endDate: tomorrow, 
        currentValue: 0, 
        completed: false 
      }
    ];
    
    userChallenges.forEach(userChallenge => {
      this.createUserChallenge(userChallenge);
    });

    // Seed health metrics for user 1
    const healthMetric: InsertHealthMetric = {
      userId: 1,
      date: today,
      steps: 6400,
      sleepHours: 4,
      waterIntake: 1600,
      stressLevel: 30
    };
    
    this.createHealthMetric(healthMetric);

    // Seed departments
    const departments: InsertDepartment[] = [
      { name: 'واحد فنی' },
      { name: 'واحد مالی' },
      { name: 'مدیریت' },
      { name: 'منابع انسانی' },
      { name: 'فروش' },
      { name: 'بازاریابی' }
    ];
    
    departments.forEach(department => {
      this.createDepartment(department);
    });

    // Seed department members
    const departmentMembers: InsertDepartmentMember[] = [
      { departmentId: 1, userId: 1 },
      { departmentId: 2, userId: 2 },
      { departmentId: 3, userId: 3 },
      { departmentId: 4, userId: 4 },
      { departmentId: 5, userId: 5 },
      { departmentId: 6, userId: 6 }
    ];
    
    departmentMembers.forEach(member => {
      const id = this.departmentMemberIdCounter++;
      const newMember: DepartmentMember = {
        ...member,
        id,
        createdAt: new Date()
      };
      this.departmentMembers.set(id, newMember);
    });

    // Seed events
    const khordad25 = new Date('2023-06-15');
    const tir1 = new Date('2023-06-22');
    const tir8 = new Date('2023-06-29');
    
    const events: InsertEvent[] = [
      { 
        title: 'چالش پیاده‌روی گروهی', 
        description: 'پیاده‌روی دسته‌جمعی برای افزایش سلامت', 
        startDate: khordad25, 
        startTime: '10:00', 
        endDate: khordad25, 
        endTime: '12:00', 
        location: 'پارک ملت', 
        maxParticipants: 20 
      },
      { 
        title: 'وبینار سلامت ذهن', 
        description: 'آشنایی با تکنیک‌های کاهش استرس و افزایش تمرکز', 
        startDate: tir1, 
        startTime: '18:00', 
        endDate: tir1, 
        endTime: '19:30', 
        location: 'آنلاین', 
        maxParticipants: 50 
      },
      { 
        title: 'کارگاه تغذیه سالم', 
        description: 'آشنایی با اصول تغذیه سالم و متعادل', 
        startDate: tir8, 
        startTime: '16:00', 
        endDate: tir8, 
        endTime: '18:00', 
        location: 'سالن همایش', 
        maxParticipants: 30 
      }
    ];
    
    events.forEach(event => {
      this.createEvent(event);
    });

    // Seed event participants
    const eventParticipants: InsertEventParticipant[] = [
      { eventId: 1, userId: 1 },
      { eventId: 1, userId: 2 },
      { eventId: 1, userId: 3 },
      { eventId: 2, userId: 4 },
      { eventId: 2, userId: 1 },
    ];
    
    eventParticipants.forEach(participant => {
      this.joinEvent(participant);
    });

    // Seed organizational metrics
    const orgMetrics: InsertOrganizationalMetric[] = [
      { departmentId: 1, date: today, participationRate: 85, healthRiskIndex: 18, wellBeingScore: 79, stressManagementIndex: 65 },
      { departmentId: 2, date: today, participationRate: 70, healthRiskIndex: 25, wellBeingScore: 75, stressManagementIndex: 60 },
      { departmentId: 3, date: today, participationRate: 60, healthRiskIndex: 30, wellBeingScore: 80, stressManagementIndex: 70 },
      { departmentId: 4, date: today, participationRate: 90, healthRiskIndex: 15, wellBeingScore: 60, stressManagementIndex: 75 },
      { departmentId: 5, date: today, participationRate: 75, healthRiskIndex: 20, wellBeingScore: 70, stressManagementIndex: 65 },
      { departmentId: 6, date: today, participationRate: 65, healthRiskIndex: 22, wellBeingScore: 85, stressManagementIndex: 68 }
    ];
    
    orgMetrics.forEach(metric => {
      this.createOrganizationalMetric(metric);
    });
  }
}

export const storage = new MemStorage();
