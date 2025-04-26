import { Router } from "express";
import { db } from "../db";
import { 
  achievements, 
  userAchievements, 
  streaks, 
  quests,
  userQuests,
  seasonalChallenges,
  userSeasonalChallenges,
  insertAchievementSchema,
  insertUserAchievementSchema,
  insertStreakSchema,
  insertQuestSchema,
  insertUserQuestSchema,
  insertSeasonalChallengeSchema,
  insertUserSeasonalChallengeSchema
} from "../../shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

const router = Router();

// Middleware to ensure user is authenticated
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

// Get achievements for the authenticated user
router.get("/user-achievements", requireAuth, async (req, res) => {
  try {
    // First get all achievements
    const allAchievements = await db.select().from(achievements);
    
    // Then get user's earned achievements
    const userEarnedAchievements = await db.select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, req.user.id));
    
    // Create a map of earned achievements for easy lookup
    const earnedMap = new Map(
      userEarnedAchievements.map(earned => [earned.achievementId, earned])
    );
    
    // Combine the data
    const achievementsWithProgress = allAchievements.map(achievement => {
      const earned = earnedMap.get(achievement.id);
      return {
        ...achievement,
        progress: earned ? 100 : achievement.defaultProgress || 0,
        earned: !!earned,
        earnedAt: earned?.createdAt || null,
      };
    });
    
    res.json(achievementsWithProgress);
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({ message: "Error fetching achievements" });
  }
});

// Get all streaks for the authenticated user
router.get("/streaks", requireAuth, async (req, res) => {
  try {
    const userStreaks = await db.select()
      .from(streaks)
      .where(eq(streaks.userId, req.user.id))
      .orderBy(desc(streaks.updatedAt));
    
    res.json(userStreaks);
  } catch (error) {
    console.error("Error fetching streaks:", error);
    res.status(500).json({ message: "Error fetching streaks" });
  }
});

// Get all quests for the authenticated user
router.get("/quests", requireAuth, async (req, res) => {
  try {
    // Get all quests
    const allQuests = await db.select().from(quests);
    
    // Get user's quest progress
    const userQuestProgress = await db.select()
      .from(userQuests)
      .where(eq(userQuests.userId, req.user.id));
    
    // Create a map for easier lookup
    const progressMap = new Map(
      userQuestProgress.map(progress => [progress.questId, progress])
    );
    
    // Combine data
    const questsWithProgress = allQuests.map(quest => {
      const progress = progressMap.get(quest.id);
      return {
        ...quest,
        currentValue: progress?.currentValue || 0,
        completed: progress?.isCompleted || false,
        progress: progress ? Math.min(100, Math.round((progress.currentValue / quest.targetValue) * 100)) : 0,
        startedAt: progress?.createdAt || null,
        completedAt: progress?.completedAt || null,
      };
    });
    
    // Filter active quests
    const now = new Date();
    const activeQuests = questsWithProgress.filter(quest => {
      const startDate = quest.startDate ? new Date(quest.startDate) : new Date(0);
      const endDate = quest.endDate ? new Date(quest.endDate) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
      return startDate <= now && endDate >= now;
    });
    
    // Separate daily and weekly quests
    const dailyQuests = activeQuests.filter(quest => quest.interval === "daily");
    const weeklyQuests = activeQuests.filter(quest => quest.interval === "weekly");
    
    res.json({
      daily: dailyQuests,
      weekly: weeklyQuests,
      all: activeQuests
    });
  } catch (error) {
    console.error("Error fetching quests:", error);
    res.status(500).json({ message: "Error fetching quests" });
  }
});

// Get all seasonal challenges for the authenticated user
router.get("/seasonal-challenges", requireAuth, async (req, res) => {
  try {
    // Get active seasonal challenges
    const now = new Date();
    const allSeasonalChallenges = await db.select()
      .from(seasonalChallenges)
      .where(
        and(
          seasonalChallenges.startDate.lte(now),
          seasonalChallenges.endDate.gte(now)
        )
      );
    
    // Get user progress for these challenges
    const userChallengeProgress = await db.select()
      .from(userSeasonalChallenges)
      .where(eq(userSeasonalChallenges.userId, req.user.id));
    
    // Create a map for easier lookup
    const progressMap = new Map(
      userChallengeProgress.map(progress => [progress.seasonalChallengeId, progress])
    );
    
    // Combine data
    const challengesWithProgress = allSeasonalChallenges.map(challenge => {
      const progress = progressMap.get(challenge.id);
      return {
        ...challenge,
        currentValue: progress?.currentValue || 0,
        isCompleted: progress?.isCompleted || false,
        progress: progress ? Math.min(100, Math.round((progress.currentValue / challenge.targetValue) * 100)) : 0,
        joinedAt: progress?.createdAt || null,
        completedAt: progress?.completedAt || null,
      };
    });
    
    res.json(challengesWithProgress);
  } catch (error) {
    console.error("Error fetching seasonal challenges:", error);
    res.status(500).json({ message: "Error fetching seasonal challenges" });
  }
});

// Increment progress on a quest
router.post("/quests/:questId/progress", requireAuth, async (req, res) => {
  try {
    const questId = parseInt(req.params.questId);
    const { incrementBy = 1 } = req.body;
    
    // Validate increment value
    if (incrementBy <= 0) {
      return res.status(400).json({ message: "Increment value must be positive" });
    }
    
    // Get the quest to check if it exists and is active
    const [quest] = await db.select()
      .from(quests)
      .where(eq(quests.id, questId));
    
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    
    // Check if quest is active
    const now = new Date();
    const startDate = quest.startDate ? new Date(quest.startDate) : new Date(0);
    const endDate = quest.endDate ? new Date(quest.endDate) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
    
    if (startDate > now || endDate < now) {
      return res.status(400).json({ message: "Quest is not active" });
    }
    
    // Get or create user quest progress
    let [userQuestProgress] = await db.select()
      .from(userQuests)
      .where(
        and(
          eq(userQuests.userId, req.user.id),
          eq(userQuests.questId, questId)
        )
      );
    
    if (!userQuestProgress) {
      // Create new progress record
      [userQuestProgress] = await db.insert(userQuests)
        .values({
          userId: req.user.id,
          questId: questId,
          currentValue: 0,
          isCompleted: false,
        })
        .returning();
    }
    
    // Check if already completed
    if (userQuestProgress.isCompleted) {
      return res.status(400).json({ message: "Quest already completed" });
    }
    
    // Update progress
    const newValue = userQuestProgress.currentValue + incrementBy;
    const isNowCompleted = newValue >= quest.targetValue;
    
    const [updatedProgress] = await db.update(userQuests)
      .set({
        currentValue: newValue,
        isCompleted: isNowCompleted,
        completedAt: isNowCompleted ? new Date() : null,
      })
      .where(
        and(
          eq(userQuests.userId, req.user.id),
          eq(userQuests.questId, questId)
        )
      )
      .returning();
    
    // Calculate progress percentage
    const progressPercentage = Math.min(100, Math.round((newValue / quest.targetValue) * 100));
    
    // Return updated progress with more information
    res.json({
      ...updatedProgress,
      quest,
      progress: progressPercentage,
      message: isNowCompleted ? "Quest completed!" : "Progress updated"
    });
  } catch (error) {
    console.error("Error updating quest progress:", error);
    res.status(500).json({ message: "Error updating quest progress" });
  }
});

// Award an achievement to a user
router.post("/achievements/:achievementId/award", requireAuth, async (req, res) => {
  try {
    const achievementId = parseInt(req.params.achievementId);
    
    // Check if achievement exists
    const [achievement] = await db.select()
      .from(achievements)
      .where(eq(achievements.id, achievementId));
    
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    
    // Check if user already has this achievement
    const [existingAward] = await db.select()
      .from(userAchievements)
      .where(
        and(
          eq(userAchievements.userId, req.user.id),
          eq(userAchievements.achievementId, achievementId)
        )
      );
    
    if (existingAward) {
      return res.status(400).json({ message: "Achievement already awarded" });
    }
    
    // Award the achievement
    const [award] = await db.insert(userAchievements)
      .values({
        userId: req.user.id,
        achievementId: achievementId,
        awardedAt: new Date(),
      })
      .returning();
    
    res.json({
      ...award,
      achievement,
      message: `Achievement "${achievement.name}" awarded!`
    });
  } catch (error) {
    console.error("Error awarding achievement:", error);
    res.status(500).json({ message: "Error awarding achievement" });
  }
});

// Update a streak for a user
router.post("/streaks/:type/update", requireAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const validTypes = ["login", "water", "steps", "workout", "meditation", "sleep"];
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid streak type" });
    }
    
    // Get current streak
    let [streak] = await db.select()
      .from(streaks)
      .where(
        and(
          eq(streaks.userId, req.user.id),
          eq(streaks.type, type)
        )
      );
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Format for timestamp comparison
    const todayStr = today.toISOString().split('T')[0];
    
    if (!streak) {
      // Create a new streak
      [streak] = await db.insert(streaks)
        .values({
          userId: req.user.id,
          type,
          currentStreak: 1,
          longestStreak: 1,
          lastUpdateDate: todayStr,
        })
        .returning();
      
      return res.json({
        ...streak,
        message: "New streak started!",
        isNewRecord: false
      });
    }
    
    // Check if already updated today
    const lastUpdateDate = new Date(streak.lastUpdateDate);
    lastUpdateDate.setHours(0, 0, 0, 0);
    
    if (lastUpdateDate.getTime() === today.getTime()) {
      return res.json({
        ...streak,
        message: "Streak already updated today",
        isNewRecord: false
      });
    }
    
    // Check if this is the next day (continuing the streak)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isNextDay = lastUpdateDate.getTime() === yesterday.getTime();
    
    let newCurrentStreak = isNextDay ? streak.currentStreak + 1 : 1;
    let newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);
    const isNewRecord = newCurrentStreak > streak.longestStreak;
    
    // Update the streak
    const [updatedStreak] = await db.update(streaks)
      .set({
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastUpdateDate: todayStr,
      })
      .where(
        and(
          eq(streaks.userId, req.user.id),
          eq(streaks.type, type)
        )
      )
      .returning();
    
    res.json({
      ...updatedStreak,
      message: isNextDay ? "Streak continued!" : "Streak reset and restarted",
      isNewRecord
    });
  } catch (error) {
    console.error("Error updating streak:", error);
    res.status(500).json({ message: "Error updating streak" });
  }
});

// Join a seasonal challenge
router.post("/seasonal-challenges/:challengeId/join", requireAuth, async (req, res) => {
  try {
    const challengeId = parseInt(req.params.challengeId);
    
    // Check if challenge exists and is active
    const [challenge] = await db.select()
      .from(seasonalChallenges)
      .where(eq(seasonalChallenges.id, challengeId));
    
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    
    const now = new Date();
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    
    if (now < startDate || now > endDate) {
      return res.status(400).json({ message: "Challenge is not active" });
    }
    
    // Check if user already joined this challenge
    const [existingProgress] = await db.select()
      .from(userSeasonalChallenges)
      .where(
        and(
          eq(userSeasonalChallenges.userId, req.user.id),
          eq(userSeasonalChallenges.seasonalChallengeId, challengeId)
        )
      );
    
    if (existingProgress) {
      return res.status(400).json({ message: "Already joined this challenge" });
    }
    
    // Join the challenge
    const [progress] = await db.insert(userSeasonalChallenges)
      .values({
        userId: req.user.id,
        seasonalChallengeId: challengeId,
        currentValue: 0,
        isCompleted: false,
      })
      .returning();
    
    res.json({
      ...progress,
      challenge,
      message: `Joined the "${challenge.title}" challenge!`
    });
  } catch (error) {
    console.error("Error joining seasonal challenge:", error);
    res.status(500).json({ message: "Error joining seasonal challenge" });
  }
});

export default router;