import { pgTable, text, serial, integer, boolean, timestamp, date, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  credits: integer("credits").default(1000).notNull(), // اعتبار کاربر
  role: text("role").default("user").notNull(), // user, hr, hse, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Health metrics model
export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  steps: integer("steps").default(0),
  sleepHours: integer("sleep_hours").default(0),
  waterIntake: integer("water_intake").default(0), // in ml
  stressLevel: integer("stress_level").default(50), // 0-100
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Challenges model
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // mental, physical, nutrition, etc.
  points: integer("points").default(10).notNull(),
  targetValue: integer("target_value").notNull(), // e.g., 10000 steps
  icon: text("icon").notNull(),
  duration: integer("duration").default(1).notNull(), // days
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User challenges (for tracking progress)
export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  currentValue: integer("current_value").default(0),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Badges model
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // steps, sleep, nutrition, etc.
  requirement: text("requirement").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User badges
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  badgeId: integer("badge_id").notNull().references(() => badges.id),
  earnedDate: date("earned_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Events model
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startDate: date("start_date").notNull(),
  startTime: text("start_time"),
  endDate: date("end_date").notNull(),
  endTime: text("end_time"),
  location: text("location"),
  maxParticipants: integer("max_participants"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Event participants
export const eventParticipants = pgTable("event_participants", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Department model
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Department members
export const departmentMembers = pgTable("department_members", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").notNull().references(() => departments.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Organizational health metrics
export const organizationalMetrics = pgTable("organizational_metrics", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").notNull().references(() => departments.id),
  date: date("date").notNull(),
  participationRate: integer("participation_rate").default(0),
  healthRiskIndex: integer("health_risk_index").default(0),
  wellBeingScore: integer("wellbeing_score").default(0),
  stressManagementIndex: integer("stress_management_index").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Credit transactions model (for tracking user credit usage)
export const creditTransactions = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(), // مقدار تراکنش (مثبت برای افزایش و منفی برای کاهش)
  balance: integer("balance").notNull(), // مانده پس از تراکنش
  description: text("description").notNull(), // توضیحات تراکنش
  actionType: text("action_type").notNull(), // نوع عملیات: test, challenge, reward, purchase, etc.
  resourceId: integer("resource_id"), // شناسه منبع مرتبط (تست، چالش و غیره)
  resourceType: text("resource_type"), // نوع منبع: test, challenge, badge, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertHealthMetricsSchema = createInsertSchema(healthMetrics).omit({ id: true, createdAt: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true, createdAt: true });
export const insertUserChallengeSchema = createInsertSchema(userChallenges).omit({ id: true, createdAt: true });
export const insertBadgeSchema = createInsertSchema(badges).omit({ id: true, createdAt: true });
export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({ id: true, createdAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertEventParticipantSchema = createInsertSchema(eventParticipants).omit({ id: true, createdAt: true });
export const insertDepartmentSchema = createInsertSchema(departments).omit({ id: true, createdAt: true });
export const insertDepartmentMemberSchema = createInsertSchema(departmentMembers).omit({ id: true, createdAt: true });
export const insertOrganizationalMetricsSchema = createInsertSchema(organizationalMetrics).omit({ id: true, createdAt: true });
export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricsSchema>;

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;

export type UserChallenge = typeof userChallenges.$inferSelect;
export type InsertUserChallenge = z.infer<typeof insertUserChallengeSchema>;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type EventParticipant = typeof eventParticipants.$inferSelect;
export type InsertEventParticipant = z.infer<typeof insertEventParticipantSchema>;

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

export type DepartmentMember = typeof departmentMembers.$inferSelect;
export type InsertDepartmentMember = z.infer<typeof insertDepartmentMemberSchema>;

export type OrganizationalMetric = typeof organizationalMetrics.$inferSelect;
export type InsertOrganizationalMetric = z.infer<typeof insertOrganizationalMetricsSchema>;

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
