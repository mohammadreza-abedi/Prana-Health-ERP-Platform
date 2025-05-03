import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, gte, lte } from "drizzle-orm";
import {
  badges,
  challenges,
  creditTransactions,
  departments,
  departmentMembers,
  events,
  eventParticipants,
  healthMetrics,
  organizationalMetrics,
  userBadges,
  userChallenges,
  type Badge,
  type InsertBadge,
  type Challenge,
  type InsertChallenge,
  type CreditTransaction,
  type InsertCreditTransaction,
  type Department,
  type InsertDepartment,
  type DepartmentMember,
  type InsertDepartmentMember,
  type Event,
  type InsertEvent,
  type EventParticipant,
  type InsertEventParticipant,
  type HealthMetric,
  type InsertHealthMetric,
  type OrganizationalMetric,
  type InsertOrganizationalMetric,
  type UserBadge,
  type InsertUserBadge,
  type UserChallenge,
  type InsertUserChallenge,
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
  
  // Credit transactions operations
  getUserCredits(userId: number): Promise<number>;
  getUserCreditTransactions(userId: number, limit?: number): Promise<CreditTransaction[]>;
  createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  updateUserCredits(userId: number, amount: number, actionType: string, description: string, resourceId?: number, resourceType?: string): Promise<{ user: User; transaction: CreditTransaction }>;
  
  // Leaderboard operations
  getLeaderboard(limit?: number): Promise<{ id: number; displayName: string; avatar?: string; xp: number; level: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getUser:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getUserByUsername:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    try {
      const result = await db.update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error in updateUser:", error);
      return undefined;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      return [];
    }
  }

  async getHealthMetricsByUserId(userId: number, date?: string): Promise<HealthMetric[]> {
    try {
      let query = db.select().from(healthMetrics).where(eq(healthMetrics.userId, userId));
      
      if (date) {
        query = query.where(eq(healthMetrics.date, date));
      }
      
      return await query.orderBy(desc(healthMetrics.date));
    } catch (error) {
      console.error("Error in getHealthMetricsByUserId:", error);
      return [];
    }
  }

  async createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric> {
    try {
      const result = await db.insert(healthMetrics).values(metric).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createHealthMetric:", error);
      throw error;
    }
  }

  async updateHealthMetric(id: number, data: Partial<HealthMetric>): Promise<HealthMetric | undefined> {
    try {
      const result = await db.update(healthMetrics)
        .set(data)
        .where(eq(healthMetrics.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error in updateHealthMetric:", error);
      return undefined;
    }
  }

  async getAllChallenges(): Promise<Challenge[]> {
    try {
      return await db.select().from(challenges);
    } catch (error) {
      console.error("Error in getAllChallenges:", error);
      return [];
    }
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    try {
      const result = await db.select().from(challenges).where(eq(challenges.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getChallenge:", error);
      return undefined;
    }
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    try {
      const result = await db.insert(challenges).values(challenge).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createChallenge:", error);
      throw error;
    }
  }

  async getUserChallengesByUserId(userId: number): Promise<(UserChallenge & { challenge: Challenge })[]> {
    try {
      const userChallengesResult = await db.select()
        .from(userChallenges)
        .where(eq(userChallenges.userId, userId));

      // Fetch all relevant challenges in one go
      const challengeIds = userChallengesResult.map(uc => uc.challengeId);
      const challengesResult = await db.select()
        .from(challenges)
        .where(challengeIds.length > 0 ? 
          (challenge => challenge.id.in(challengeIds)) : 
          undefined);

      // Create a map for faster lookup
      const challengeMap = new Map<number, Challenge>();
      challengesResult.forEach(challenge => {
        challengeMap.set(challenge.id, challenge);
      });

      // Join the data
      return userChallengesResult.map(userChallenge => {
        const challenge = challengeMap.get(userChallenge.challengeId);
        if (!challenge) {
          throw new Error(`Challenge with id ${userChallenge.challengeId} not found`);
        }
        return { ...userChallenge, challenge };
      });
    } catch (error) {
      console.error("Error in getUserChallengesByUserId:", error);
      return [];
    }
  }

  async createUserChallenge(userChallenge: InsertUserChallenge): Promise<UserChallenge> {
    try {
      const result = await db.insert(userChallenges).values(userChallenge).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createUserChallenge:", error);
      throw error;
    }
  }

  async updateUserChallenge(id: number, data: Partial<UserChallenge>): Promise<UserChallenge | undefined> {
    try {
      const result = await db.update(userChallenges)
        .set(data)
        .where(eq(userChallenges.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error in updateUserChallenge:", error);
      return undefined;
    }
  }

  async getAllBadges(): Promise<Badge[]> {
    try {
      return await db.select().from(badges);
    } catch (error) {
      console.error("Error in getAllBadges:", error);
      return [];
    }
  }

  async getBadge(id: number): Promise<Badge | undefined> {
    try {
      const result = await db.select().from(badges).where(eq(badges.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getBadge:", error);
      return undefined;
    }
  }

  async createBadge(badge: InsertBadge): Promise<Badge> {
    try {
      const result = await db.insert(badges).values(badge).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createBadge:", error);
      throw error;
    }
  }

  async getUserBadgesByUserId(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    try {
      const userBadgesResult = await db.select()
        .from(userBadges)
        .where(eq(userBadges.userId, userId));

      // Fetch all relevant badges in one go
      const badgeIds = userBadgesResult.map(ub => ub.badgeId);
      const badgesResult = await db.select()
        .from(badges)
        .where(badgeIds.length > 0 ? 
          (badge => badge.id.in(badgeIds)) : 
          undefined);

      // Create a map for faster lookup
      const badgeMap = new Map<number, Badge>();
      badgesResult.forEach(badge => {
        badgeMap.set(badge.id, badge);
      });

      // Join the data
      return userBadgesResult.map(userBadge => {
        const badge = badgeMap.get(userBadge.badgeId);
        if (!badge) {
          throw new Error(`Badge with id ${userBadge.badgeId} not found`);
        }
        return { ...userBadge, badge };
      });
    } catch (error) {
      console.error("Error in getUserBadgesByUserId:", error);
      return [];
    }
  }

  async createUserBadge(userBadge: InsertUserBadge): Promise<UserBadge> {
    try {
      const result = await db.insert(userBadges).values(userBadge).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createUserBadge:", error);
      throw error;
    }
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      return await db.select().from(events);
    } catch (error) {
      console.error("Error in getAllEvents:", error);
      return [];
    }
  }

  async getEvent(id: number): Promise<Event | undefined> {
    try {
      const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getEvent:", error);
      return undefined;
    }
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    try {
      const result = await db.insert(events).values(event).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createEvent:", error);
      throw error;
    }
  }

  async getEventParticipants(eventId: number): Promise<User[]> {
    try {
      const participants = await db.select({
        user: users
      })
      .from(eventParticipants)
      .innerJoin(users, eq(eventParticipants.userId, users.id))
      .where(eq(eventParticipants.eventId, eventId));
      
      return participants.map(p => p.user);
    } catch (error) {
      console.error("Error in getEventParticipants:", error);
      return [];
    }
  }

  async joinEvent(data: InsertEventParticipant): Promise<EventParticipant> {
    try {
      const result = await db.insert(eventParticipants).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error in joinEvent:", error);
      throw error;
    }
  }

  async leaveEvent(eventId: number, userId: number): Promise<boolean> {
    try {
      const result = await db.delete(eventParticipants)
        .where(
          and(
            eq(eventParticipants.eventId, eventId),
            eq(eventParticipants.userId, userId)
          )
        );
      return true;
    } catch (error) {
      console.error("Error in leaveEvent:", error);
      return false;
    }
  }

  async getAllDepartments(): Promise<Department[]> {
    try {
      const result = await db.select().from(departments);
      
      // اگر داده‌های واقعی موجود باشند، آنها را برمی‌گردانیم
      if (result && result.length > 0) {
        return result;
      }
      
      // در غیر این صورت داده‌های ساختگی دپارتمان‌ها را برمی‌گردانیم
      console.log("Creating mock departments data");
      
      // دپارتمان‌های ساختگی برای شرکت
      const mockDepartments: Department[] = [
        { id: 1, name: "منابع انسانی", createdAt: new Date() },
        { id: 2, name: "فنی", createdAt: new Date() },
        { id: 3, name: "IT", createdAt: new Date() },
        { id: 4, name: "مارکتینگ", createdAt: new Date() },
        { id: 5, name: "فروش", createdAt: new Date() },
        { id: 6, name: "تولید", createdAt: new Date() },
        { id: 7, name: "مالی", createdAt: new Date() },
        { id: 8, name: "توسعه محصول", createdAt: new Date() }
      ];
      
      return mockDepartments;
    } catch (error) {
      console.error("Error in getAllDepartments:", error);
      return [];
    }
  }

  async getDepartment(id: number): Promise<Department | undefined> {
    try {
      const result = await db.select().from(departments).where(eq(departments.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error("Error in getDepartment:", error);
      return undefined;
    }
  }

  async createDepartment(department: InsertDepartment): Promise<Department> {
    try {
      const result = await db.insert(departments).values(department).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createDepartment:", error);
      throw error;
    }
  }

  async getDepartmentMembers(departmentId: number): Promise<User[]> {
    try {
      const members = await db.select({
        user: users
      })
      .from(departmentMembers)
      .innerJoin(users, eq(departmentMembers.userId, users.id))
      .where(eq(departmentMembers.departmentId, departmentId));
      
      return members.map(m => m.user);
    } catch (error) {
      console.error("Error in getDepartmentMembers:", error);
      return [];
    }
  }

  async getOrganizationalMetrics(departmentId: number, date?: string): Promise<OrganizationalMetric[]> {
    try {
      let query = db.select()
        .from(organizationalMetrics)
        .where(eq(organizationalMetrics.departmentId, departmentId));
      
      if (date) {
        query = query.where(eq(organizationalMetrics.date, date));
      }
      
      return await query.orderBy(desc(organizationalMetrics.date));
    } catch (error) {
      console.error("Error in getOrganizationalMetrics:", error);
      return [];
    }
  }

  async createOrganizationalMetric(metric: InsertOrganizationalMetric): Promise<OrganizationalMetric> {
    try {
      const result = await db.insert(organizationalMetrics).values(metric).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createOrganizationalMetric:", error);
      throw error;
    }
  }
  
  // Credit transactions operations
  async getUserCredits(userId: number): Promise<number> {
    try {
      const user = await this.getUser(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return user.credits;
    } catch (error) {
      console.error("Error in getUserCredits:", error);
      throw error;
    }
  }

  async getUserCreditTransactions(userId: number, limit: number = 20): Promise<CreditTransaction[]> {
    try {
      return await db.select()
        .from(creditTransactions)
        .where(eq(creditTransactions.userId, userId))
        .orderBy(desc(creditTransactions.createdAt))
        .limit(limit);
    } catch (error) {
      console.error("Error in getUserCreditTransactions:", error);
      return [];
    }
  }

  async createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction> {
    try {
      const result = await db.insert(creditTransactions).values(transaction).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createCreditTransaction:", error);
      throw error;
    }
  }

  async updateUserCredits(
    userId: number, 
    amount: number, 
    actionType: string, 
    description: string, 
    resourceId?: number, 
    resourceType?: string
  ): Promise<{ user: User; transaction: CreditTransaction }> {
    try {
      // Get current user to check current credits
      const user = await this.getUser(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      // Calculate new balance
      const newBalance = user.credits + amount;
      
      // Don't allow negative balance
      if (newBalance < 0) {
        throw new Error("Insufficient credits");
      }
      
      // Update user credits
      const updatedUser = await this.updateUser(userId, { credits: newBalance });
      if (!updatedUser) {
        throw new Error(`Failed to update credits for user ${userId}`);
      }
      
      // Create transaction record
      const transaction = await this.createCreditTransaction({
        userId,
        amount,
        balance: newBalance,
        description,
        actionType,
        resourceId,
        resourceType,
      });
      
      return { user: updatedUser, transaction };
    } catch (error) {
      console.error("Error in updateUserCredits:", error);
      throw error;
    }
  }

  async getLeaderboard(limit: number = 10): Promise<{ id: number; displayName: string; avatar?: string; xp: number; level: number; department?: string; rank?: number; previousRank?: number; streak?: number; badges?: number; challengesCompleted?: number; title?: string; }[]> {
    try {
      // اول سعی می‌کنیم داده‌های واقعی را از دیتابیس بگیریم
      const dbResult = await db.select({
        id: users.id,
        displayName: users.displayName,
        avatar: users.avatar,
        xp: users.xp,
        level: users.level
      })
      .from(users)
      .orderBy(desc(users.xp))
      .limit(limit);
      
      // اگر داده‌های واقعی موجود باشند، آنها را با فرمت صحیح برمی‌گردانیم
      if (dbResult && dbResult.length > 0) {
        return dbResult.map(user => ({
          id: user.id,
          displayName: user.displayName,
          avatar: user.avatar === null ? undefined : user.avatar,
          xp: user.xp,
          level: user.level,
          department: undefined,
          rank: undefined,
          previousRank: undefined,
          streak: undefined,
          badges: undefined,
          challengesCompleted: undefined,
          title: undefined
        }));
      }
      
      // در غیر این صورت داده‌های ساختگی برای شرکت فرضی ایجاد می‌کنیم
      console.log("Creating mock leaderboard data for company");
      
      // اسامی ساختگی برای کارمندان شرکت
      const mockNames = [
        "علی محمدی", "سارا رضایی", "محمد کریمی", "مریم حسینی", 
        "امیر نجفی", "فاطمه قاسمی", "رضا عباسی", "زهرا اکبری",
        "حسین میرزایی", "نسرین صادقی", "مهدی احمدی", "الهام فتحی",
        "محسن توکلی", "شیما جلالی", "جواد رحیمی"
      ];
      
      // عنوان‌های ساختگی
      const mockTitles = [
        "مدیر منابع انسانی", "کارشناس فنی", "کارشناس IT", "مدیر مارکتینگ",
        "کارشناس فروش", "مدیر تولید", "حسابدار", "مدیر پروژه",
        "گرافیست", "مدیر مالی", "کارشناس پشتیبانی", "برنامه‌نویس ارشد",
        "کارشناس QA", "مدیر محصول", "مسئول لجستیک"
      ];
      
      // دپارتمان‌های ساختگی
      const mockDepartments = [
        "منابع انسانی", "فنی", "IT", "مارکتینگ",
        "فروش", "تولید", "مالی", "توسعه محصول"
      ];
      
      const mockLeaderboard = mockNames.map((name, index) => {
        // ایجاد اکسپی تصادفی با ترتیب نزولی
        const xp = 10000 - (index * 250) + Math.floor(Math.random() * 200);
        // محاسبه سطح بر اساس اکسپی
        const level = Math.floor(xp / 1000) + 1;
        // سایر مقادیر
        const department = mockDepartments[Math.floor(Math.random() * mockDepartments.length)];
        const rank = index + 1;
        const previousRank = rank + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0) * (Math.random() > 0.5 ? 1 : -1);
        const streak = Math.floor(Math.random() * 30) + 1;
        const badges = Math.floor(Math.random() * 15) + 1;
        const challengesCompleted = Math.floor(Math.random() * 20) + 1;
        const title = mockTitles[index];
        
        return {
          id: index + 1,
          displayName: name,
          xp,
          level,
          department,
          rank,
          previousRank,
          streak,
          badges,
          challengesCompleted,
          title
        };
      });
      
      return mockLeaderboard.slice(0, limit);
    } catch (error) {
      console.error("Error in getLeaderboard:", error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();