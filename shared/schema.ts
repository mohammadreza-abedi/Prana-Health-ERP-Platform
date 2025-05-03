import { pgTable, text, serial, integer, boolean, timestamp, date, jsonb, real, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { 
  userAvatars, 
  userItems, 
  walletTransactions, 
  avatars, 
  shopItems, 
  avatarFeatures, 
  userAvatarFeatures, 
  promotions 
} from "./avatar-schema";

// User model - بهبود یافته و کامل
// ----------------- نقطه ورودی مدل‌های دیتابیس -----------------

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  email: text("email").unique(),
  phone: text("phone"),
  bio: text("bio"),
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  credits: integer("credits").default(1000).notNull(), // اعتبار کاربر
  role: text("role").default("user").notNull(), // user, hr, hse, admin
  theme: text("theme").default("light"), // تم مورد علاقه کاربر
  language: text("language").default("fa"), // زبان مورد علاقه کاربر
  notifications: boolean("notifications").default(true), // آیا اعلان‌ها فعال هستند
  lastActive: timestamp("last_active"), // آخرین زمان فعال بودن
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط کاربر
export const usersRelations = relations(users, ({ many, one }) => ({
  userProfile: one(userProfiles),
  bodyCompositions: many(bodyCompositions),
  healthMetrics: many(healthMetrics),
  mentalHealthMetrics: many(mentalHealthMetrics),
  userEducations: many(userEducations),
  healthReminders: many(healthReminders),
  userChallenges: many(userChallenges),
  userBadges: many(userBadges),
  userAchievements: many(userAchievements),
  streaks: many(streaks),
  userQuests: many(userQuests),
  userSeasonalChallenges: many(userSeasonalChallenges),
  creditTransactions: many(creditTransactions),
  eventParticipations: many(eventParticipants),
  departmentMemberships: many(departmentMembers),
  
  // روابط سیستم آواتار
  userAvatars: many(userAvatars, { relationName: "user" }),
  userItems: many(userItems, { relationName: "user" }),
  walletTransactions: many(walletTransactions, { relationName: "user" }),
}));

// مدل پروفایل کاربر برای اطلاعات گسترده‌تر
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  birthDate: date("birth_date"),
  gender: text("gender"),
  height: real("height"), // سانتی‌متر
  weight: real("weight"), // کیلوگرم
  bloodType: text("blood_type"),
  medicalConditions: text("medical_conditions").array(),
  allergies: text("allergies").array(),
  emergencyContact: text("emergency_contact"),
  fitnessGoals: text("fitness_goals").array(),
  dietPreferences: text("diet_preferences").array(),
  occupation: text("occupation"),
  employeeId: text("employee_id"),
  hireDate: date("hire_date"),
  position: text("position"),
  address: text("address"),
  city: text("city"),
  province: text("province"),
  postalCode: text("postal_code"),
  country: text("country").default("Iran"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط پروفایل کاربر
export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

// مدل اطلاعات بدنی کاربر - بادی کامپوزیشن
export const bodyCompositions = pgTable("body_compositions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  weight: real("weight"), // کیلوگرم
  height: real("height"), // سانتی‌متر
  bmi: real("bmi"), // شاخص توده بدنی
  bodyFatPercentage: real("body_fat_percentage"), // درصد چربی بدن
  muscleMass: real("muscle_mass"), // توده عضلانی (کیلوگرم)
  boneMass: real("bone_mass"), // توده استخوانی (کیلوگرم)
  waterPercentage: real("water_percentage"), // درصد آب بدن
  visceralFat: real("visceral_fat"), // چربی احشایی
  metabolicAge: integer("metabolic_age"), // سن متابولیک (سال)
  waistCircumference: real("waist_circumference"), // دور کمر (سانتی‌متر)
  hipCircumference: real("hip_circumference"), // دور باسن (سانتی‌متر)
  waistToHipRatio: real("waist_to_hip_ratio"), // نسبت دور کمر به باسن
  chestCircumference: real("chest_circumference"), // دور سینه (سانتی‌متر)
  armCircumference: real("arm_circumference"), // دور بازو (سانتی‌متر)
  thighCircumference: real("thigh_circumference"), // دور ران (سانتی‌متر)
  calfCircumference: real("calf_circumference"), // دور ساق پا (سانتی‌متر)
  neckCircumference: real("neck_circumference"), // دور گردن (سانتی‌متر)
  shoulderWidth: real("shoulder_width"), // عرض شانه (سانتی‌متر)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط اطلاعات بدنی
export const bodyCompositionsRelations = relations(bodyCompositions, ({ one }) => ({
  user: one(users, {
    fields: [bodyCompositions.userId],
    references: [users.id],
  }),
}));

// Health metrics model - بهبود یافته
export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  steps: integer("steps").default(0),
  distance: real("distance").default(0), // کیلومتر
  calories: integer("calories").default(0), // کالری سوزانده شده
  activeMinutes: integer("active_minutes").default(0), // دقایق فعالیت
  heartRate: integer("heart_rate"), // ضربان قلب متوسط
  heartRateMin: integer("heart_rate_min"), // حداقل ضربان قلب
  heartRateMax: integer("heart_rate_max"), // حداکثر ضربان قلب
  sleepHours: real("sleep_hours").default(0),
  sleepQuality: integer("sleep_quality").default(50), // کیفیت خواب (0-100)
  sleepDeepHours: real("sleep_deep_hours"), // ساعات خواب عمیق
  sleepLightHours: real("sleep_light_hours"), // ساعات خواب سبک
  sleepRemHours: real("sleep_rem_hours"), // ساعات خواب REM
  waterIntake: integer("water_intake").default(0), // میلی‌لیتر
  mealCount: integer("meal_count"), // تعداد وعده‌های غذایی
  calorieIntake: integer("calorie_intake"), // کالری دریافتی
  proteinIntake: integer("protein_intake"), // گرم پروتئین
  carbIntake: integer("carb_intake"), // گرم کربوهیدرات
  fatIntake: integer("fat_intake"), // گرم چربی
  fiberIntake: integer("fiber_intake"), // گرم فیبر
  stressLevel: integer("stress_level").default(50), // 0-100
  moodRating: integer("mood_rating"), // 0-100
  o2Saturation: integer("o2_saturation"), // درصد اشباع اکسیژن
  bloodPressureSystolic: integer("blood_pressure_systolic"), // فشار خون سیستولیک
  bloodPressureDiastolic: integer("blood_pressure_diastolic"), // فشار خون دیاستولیک
  bloodGlucose: integer("blood_glucose"), // قند خون
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط سلامت جسمی
export const healthMetricsRelations = relations(healthMetrics, ({ one }) => ({
  user: one(users, {
    fields: [healthMetrics.userId],
    references: [users.id],
  }),
}));

// مدل سلامت روانی و روحی
export const mentalHealthMetrics = pgTable("mental_health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  stressLevel: integer("stress_level").default(50), // 0-100
  anxietyLevel: integer("anxiety_level").default(50), // 0-100
  depressionLevel: integer("depression_level").default(50), // 0-100
  moodRating: integer("mood_rating").default(50), // 0-100
  sleepQuality: integer("sleep_quality").default(50), // 0-100
  energyLevel: integer("energy_level").default(50), // 0-100
  focusLevel: integer("focus_level").default(50), // 0-100
  motivationLevel: integer("motivation_level").default(50), // 0-100
  socialInteractionLevel: integer("social_interaction_level").default(50), // 0-100
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط سلامت روانی
export const mentalHealthMetricsRelations = relations(mentalHealthMetrics, ({ one }) => ({
  user: one(users, {
    fields: [mentalHealthMetrics.userId],
    references: [users.id],
  }),
}));

// مدل محتوای آموزشی
export const educationalContents = pgTable("educational_contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // health, fitness, nutrition, etc.
  type: text("type").notNull(), // video, article, infographic, quiz
  content: text("content").notNull(), // URL or content
  author: text("author"),
  estimatedDuration: integer("estimated_duration"), // در دقیقه
  points: integer("points").default(10),
  tags: text("tags").array(),
  level: text("level").default("beginner"), // beginner, intermediate, advanced
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// مدل آموزش‌های کاربر
export const userEducations = pgTable("user_educations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  contentId: integer("content_id").notNull().references(() => educationalContents.id),
  completionDate: date("completion_date"),
  progress: integer("progress").default(0), // 0-100
  quizScore: integer("quiz_score"),
  certificateEarned: boolean("certificate_earned").default(false),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط محتوای آموزشی
export const educationalContentsRelations = relations(educationalContents, ({ many }) => ({
  userEducations: many(userEducations),
}));

// روابط آموزش‌های کاربر
export const userEducationsRelations = relations(userEducations, ({ one }) => ({
  user: one(users, { 
    fields: [userEducations.userId],
    references: [users.id],
  }),
  content: one(educationalContents, {
    fields: [userEducations.contentId],
    references: [educationalContents.id],
  }),
}));

// مدل یادآوری‌های سلامتی
export const healthReminders = pgTable("health_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // water, stretching, posture, eye rest, etc.
  recurrence: text("recurrence").notNull(), // daily, hourly, weekly
  startTime: text("start_time").notNull(),
  endTime: text("end_time"),
  daysOfWeek: text("days_of_week").array(), // ["monday", "wednesday", "friday"]
  interval: integer("interval"), // every X hours/minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// روابط یادآوری‌های سلامتی
export const healthRemindersRelations = relations(healthReminders, ({ one }) => ({
  user: one(users, {
    fields: [healthReminders.userId],
    references: [users.id],
  }),
}));

// مدل برنامه‌های تمرینی
export const workoutPlans = pgTable("workout_plans", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  targetArea: text("target_area").notNull(), // full body, upper body, core, etc.
  estimatedDuration: integer("estimated_duration").notNull(), // در دقیقه
  caloriesBurn: integer("calories_burn"),
  createdBy: integer("created_by").references(() => users.id), // HR, HSE یا مدیر
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// مدل تمرین‌ها
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  muscleGroups: text("muscle_groups").array(), // chest, back, legs, etc.
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  media: text("media"), // URL to image or video
  equipmentNeeded: text("equipment_needed").array(),
  estimatedDuration: integer("estimated_duration"), // در ثانیه
  caloriesBurn: integer("calories_burn"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// رابطه بین برنامه تمرینی و تمرین‌ها
export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutPlanId: integer("workout_plan_id").notNull().references(() => workoutPlans.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  setCount: integer("set_count").default(3),
  repCount: integer("rep_count").default(10),
  restTime: integer("rest_time").default(60), // در ثانیه
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// روابط تمرین‌ها
export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

// روابط برنامه‌های تمرینی
export const workoutPlansRelations = relations(workoutPlans, ({ many, one }) => ({
  workoutExercises: many(workoutExercises),
  creator: one(users, {
    fields: [workoutPlans.createdBy],
    references: [users.id],
  }),
}));

// روابط بین برنامه تمرینی و تمرین‌ها
export const workoutExercisesRelations = relations(workoutExercises, ({ one }) => ({
  workoutPlan: one(workoutPlans, {
    fields: [workoutExercises.workoutPlanId],
    references: [workoutPlans.id],
  }),
  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id],
  }),
}));

// Challenges model - بهبود یافته
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // mental, physical, nutrition, etc.
  points: integer("points").default(10).notNull(),
  targetValue: integer("target_value").notNull(), // e.g., 10000 steps
  icon: text("icon").notNull(),
  difficulty: text("difficulty").default("medium"), // easy, medium, hard
  duration: integer("duration").default(1).notNull(), // days
  targetMetric: text("target_metric").default("steps"), // steps, water, sleep, etc.
  rewardType: text("reward_type").default("xp"), // xp, credits, badge
  rewardValue: integer("reward_value").default(100), // مقدار پاداش
  category: text("category"), // دسته‌بندی چالش
  startDate: date("start_date"), // تاریخ شروع (اختیاری، اگر چالش در زمان خاصی فعال است)
  endDate: date("end_date"), // تاریخ پایان
  isActive: boolean("is_active").default(true),
  isTeamChallenge: boolean("is_team_challenge").default(false), // آیا چالش تیمی است
  createdBy: integer("created_by").references(() => users.id), // توسط چه کسی ایجاد شده
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

// Achievement Types for the gamification system
export const achievementTypes = pgTable("achievement_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // سلامت جسمی، سلامت روانی، تغذیه، فعالیت روزانه
  icon: text("icon").notNull(),
  color: text("color").notNull().default("tiffany"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Achievements for the gamification system
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  typeId: integer("type_id").notNull().references(() => achievementTypes.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  requirement: text("requirement").notNull(),
  targetValue: integer("target_value").notNull(),
  metricType: text("metric_type").notNull(), // steps, water, sleep, exercise, etc.
  icon: text("icon").notNull(),
  level: integer("level").default(1).notNull(), // برخی از دستاوردها سطح‌های مختلف دارند
  xpReward: integer("xp_reward").default(50).notNull(),
  creditReward: integer("credit_reward").default(100),
  rarity: text("rarity").default("common"), // common, uncommon, rare, epic, legendary
  isSecret: boolean("is_secret").default(false), // آیا یک دستاورد مخفی است
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  earnedDate: date("earned_date").notNull(),
  progress: integer("progress").default(0), // پیشرفت کاربر به سمت دستاورد (0-100)
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Streaks system for tracking daily engagement
export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // login, workout, meditation, water, nutrition
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastUpdateDate: date("last_update_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Daily quests system
export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // daily, weekly, social, workplace
  difficulty: text("difficulty").default("easy"), // easy, medium, hard
  requirement: text("requirement").notNull(),
  targetValue: integer("target_value").notNull(),
  metricType: text("metric_type").notNull(), // steps, water, meditation, etc.
  xpReward: integer("xp_reward").default(20).notNull(),
  creditReward: integer("credit_reward").default(50),
  isActive: boolean("is_active").default(true),
  refreshType: text("refresh_type").default("daily"), // daily, weekly, monthly, once
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User quests
export const userQuests = pgTable("user_quests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  questId: integer("quest_id").notNull().references(() => quests.id),
  issueDate: date("issue_date").notNull(),
  expiryDate: date("expiry_date").notNull(),
  currentValue: integer("current_value").default(0),
  isCompleted: boolean("is_completed").default(false),
  completedDate: date("completed_date"),
  rewardClaimed: boolean("reward_claimed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Seasonal challenges (limited-time events)
export const seasonalChallenges = pgTable("seasonal_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  season: text("season").notNull(), // بهار 1403، تابستان 1403، etc.
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  points: integer("points").default(100).notNull(),
  targetValue: integer("target_value").notNull(),
  targetMetric: text("target_metric").notNull(),
  theme: text("theme").notNull(), // تم فصل
  bannerImage: text("banner_image"),
  xpReward: integer("xp_reward").default(200).notNull(),
  creditReward: integer("credit_reward").default(500),
  badgeId: integer("badge_id").references(() => badges.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User seasonal challenges
export const userSeasonalChallenges = pgTable("user_seasonal_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  seasonalChallengeId: integer("seasonal_challenge_id").notNull().references(() => seasonalChallenges.id),
  currentValue: integer("current_value").default(0),
  isCompleted: boolean("is_completed").default(false),
  completedDate: date("completed_date"),
  rewardClaimed: boolean("reward_claimed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

// روابط بین چالش‌ها و کاربران
export const challengesRelations = relations(challenges, ({ many, one }) => ({
  userChallenges: many(userChallenges),
  creator: one(users, {
    fields: [challenges.createdBy],
    references: [users.id],
  }),
}));

// روابط بین کاربران و چالش‌ها
export const userChallengesRelations = relations(userChallenges, ({ one }) => ({
  user: one(users, {
    fields: [userChallenges.userId],
    references: [users.id],
  }),
  challenge: one(challenges, {
    fields: [userChallenges.challengeId],
    references: [challenges.id],
  }),
}));

// روابط بین نشان‌ها و کاربران
export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));

// روابط بین کاربران و نشان‌ها
export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

// روابط بین رویدادها و شرکت‌کنندگان
export const eventsRelations = relations(events, ({ many }) => ({
  participants: many(eventParticipants),
}));

// روابط بین کاربران و رویدادها
export const eventParticipantsRelations = relations(eventParticipants, ({ one }) => ({
  user: one(users, {
    fields: [eventParticipants.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [eventParticipants.eventId],
    references: [events.id],
  }),
}));

// روابط بین دپارتمان‌ها و اعضا
export const departmentsRelations = relations(departments, ({ many }) => ({
  members: many(departmentMembers),
  metrics: many(organizationalMetrics),
}));

// روابط بین کاربران و دپارتمان‌ها
export const departmentMembersRelations = relations(departmentMembers, ({ one }) => ({
  user: one(users, {
    fields: [departmentMembers.userId],
    references: [users.id],
  }),
  department: one(departments, {
    fields: [departmentMembers.departmentId],
    references: [departments.id],
  }),
}));

// روابط بین دپارتمان‌ها و معیارهای سازمانی
export const organizationalMetricsRelations = relations(organizationalMetrics, ({ one }) => ({
  department: one(departments, {
    fields: [organizationalMetrics.departmentId],
    references: [departments.id],
  }),
}));

// روابط بین کاربران و تراکنش‌های اعتباری
export const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  user: one(users, {
    fields: [creditTransactions.userId],
    references: [users.id],
  }),
}));

// روابط دستاوردها
export const achievementsRelations = relations(achievements, ({ one, many }) => ({
  type: one(achievementTypes, {
    fields: [achievements.typeId],
    references: [achievementTypes.id],
  }),
  userAchievements: many(userAchievements),
}));

// روابط انواع دستاوردها
export const achievementTypesRelations = relations(achievementTypes, ({ many }) => ({
  achievements: many(achievements),
}));

// روابط دستاوردهای کاربر
export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

// روابط استریک‌ها
export const streaksRelations = relations(streaks, ({ one }) => ({
  user: one(users, {
    fields: [streaks.userId],
    references: [users.id],
  }),
}));

// روابط کوئست‌ها
export const questsRelations = relations(quests, ({ many }) => ({
  userQuests: many(userQuests),
}));

// روابط کوئست‌های کاربر
export const userQuestsRelations = relations(userQuests, ({ one }) => ({
  user: one(users, {
    fields: [userQuests.userId],
    references: [users.id],
  }),
  quest: one(quests, {
    fields: [userQuests.questId],
    references: [quests.id],
  }),
}));

// روابط چالش‌های فصلی
export const seasonalChallengesRelations = relations(seasonalChallenges, ({ many, one }) => ({
  userSeasonalChallenges: many(userSeasonalChallenges),
  badge: one(badges, {
    fields: [seasonalChallenges.badgeId],
    references: [badges.id],
  }),
}));

// روابط چالش‌های فصلی کاربر
export const userSeasonalChallengesRelations = relations(userSeasonalChallenges, ({ one }) => ({
  user: one(users, {
    fields: [userSeasonalChallenges.userId],
    references: [users.id],
  }),
  seasonalChallenge: one(seasonalChallenges, {
    fields: [userSeasonalChallenges.seasonalChallengeId],
    references: [seasonalChallenges.id],
  }),
}));

// مدل نظرسنجی‌ها
export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  questions: jsonb("questions").notNull(), // آرایه‌ای از سوالات
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// مدل پاسخ‌های نظرسنجی
export const surveyResponses = pgTable("survey_responses", {
  id: serial("id").primaryKey(),
  surveyId: integer("survey_id").notNull().references(() => surveys.id),
  userId: integer("user_id").notNull().references(() => users.id),
  answers: jsonb("answers").notNull(), // آرایه‌ای از پاسخ‌ها
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// روابط بین نظرسنجی‌ها و پاسخ‌ها
export const surveysRelations = relations(surveys, ({ many, one }) => ({
  responses: many(surveyResponses),
  creator: one(users, {
    fields: [surveys.createdBy],
    references: [users.id],
  }),
}));

// روابط بین کاربران و پاسخ‌های نظرسنجی
export const surveyResponsesRelations = relations(surveyResponses, ({ one }) => ({
  user: one(users, {
    fields: [surveyResponses.userId],
    references: [users.id],
  }),
  survey: one(surveys, {
    fields: [surveyResponses.surveyId],
    references: [surveys.id],
  }),
}));

// Insert schemas - تعریف اسکیماهای ورودی
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBodyCompositionSchema = createInsertSchema(bodyCompositions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHealthMetricsSchema = createInsertSchema(healthMetrics).omit({ id: true, createdAt: true, updatedAt: true });
export const insertMentalHealthMetricsSchema = createInsertSchema(mentalHealthMetrics).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEducationalContentSchema = createInsertSchema(educationalContents).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserEducationSchema = createInsertSchema(userEducations).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHealthReminderSchema = createInsertSchema(healthReminders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWorkoutPlanSchema = createInsertSchema(workoutPlans).omit({ id: true, createdAt: true, updatedAt: true });
export const insertExerciseSchema = createInsertSchema(exercises).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWorkoutExerciseSchema = createInsertSchema(workoutExercises).omit({ id: true, createdAt: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserChallengeSchema = createInsertSchema(userChallenges).omit({ id: true, createdAt: true });
export const insertBadgeSchema = createInsertSchema(badges).omit({ id: true, createdAt: true });
export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({ id: true, createdAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertEventParticipantSchema = createInsertSchema(eventParticipants).omit({ id: true, createdAt: true });
export const insertDepartmentSchema = createInsertSchema(departments).omit({ id: true, createdAt: true });
export const insertDepartmentMemberSchema = createInsertSchema(departmentMembers).omit({ id: true, createdAt: true });
export const insertOrganizationalMetricsSchema = createInsertSchema(organizationalMetrics).omit({ id: true, createdAt: true });
export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({ id: true, createdAt: true });
export const insertSurveySchema = createInsertSchema(surveys).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSurveyResponseSchema = createInsertSchema(surveyResponses).omit({ id: true, createdAt: true });

// New gamification schemas
export const insertAchievementTypeSchema = createInsertSchema(achievementTypes).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStreakSchema = createInsertSchema(streaks).omit({ id: true, createdAt: true, updatedAt: true });
export const insertQuestSchema = createInsertSchema(quests).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserQuestSchema = createInsertSchema(userQuests).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSeasonalChallengeSchema = createInsertSchema(seasonalChallenges).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserSeasonalChallengeSchema = createInsertSchema(userSeasonalChallenges).omit({ id: true, createdAt: true, updatedAt: true });

// Types - تعریف تایپ‌های خروجی و ورودی
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type BodyComposition = typeof bodyCompositions.$inferSelect;
export type InsertBodyComposition = z.infer<typeof insertBodyCompositionSchema>;

export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricsSchema>;

export type MentalHealthMetric = typeof mentalHealthMetrics.$inferSelect;
export type InsertMentalHealthMetric = z.infer<typeof insertMentalHealthMetricsSchema>;

export type EducationalContent = typeof educationalContents.$inferSelect;
export type InsertEducationalContent = z.infer<typeof insertEducationalContentSchema>;

export type UserEducation = typeof userEducations.$inferSelect;
export type InsertUserEducation = z.infer<typeof insertUserEducationSchema>;

export type HealthReminder = typeof healthReminders.$inferSelect;
export type InsertHealthReminder = z.infer<typeof insertHealthReminderSchema>;

export type WorkoutPlan = typeof workoutPlans.$inferSelect;
export type InsertWorkoutPlan = z.infer<typeof insertWorkoutPlanSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type InsertWorkoutExercise = z.infer<typeof insertWorkoutExerciseSchema>;

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

export type Survey = typeof surveys.$inferSelect;
export type InsertSurvey = z.infer<typeof insertSurveySchema>;

export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;

// New gamification types
export type AchievementType = typeof achievementTypes.$inferSelect;
export type InsertAchievementType = z.infer<typeof insertAchievementTypeSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = z.infer<typeof insertStreakSchema>;

export type Quest = typeof quests.$inferSelect;
export type InsertQuest = z.infer<typeof insertQuestSchema>;

export type UserQuest = typeof userQuests.$inferSelect;
export type InsertUserQuest = z.infer<typeof insertUserQuestSchema>;

export type SeasonalChallenge = typeof seasonalChallenges.$inferSelect;
export type InsertSeasonalChallenge = z.infer<typeof insertSeasonalChallengeSchema>;

export type UserSeasonalChallenge = typeof userSeasonalChallenges.$inferSelect;
export type InsertUserSeasonalChallenge = z.infer<typeof insertUserSeasonalChallengeSchema>;

