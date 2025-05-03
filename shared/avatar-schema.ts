import { pgTable, text, serial, integer, boolean, timestamp, date, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { users } from "./schema";

// ----------------- سیستم آواتار و فروشگاه گیمیفای شده -----------------

// آواتارهای پایه موجود در سیستم
export const avatars = pgTable('avatars', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  imagePath: text('image_path').notNull(),
  category: text('category').notNull(),
  rarity: text('rarity').notNull().default('common'), // common, rare, epic, legendary
  isDefault: boolean('is_default').notNull().default(false),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// آیتم‌های قابل خرید در فروشگاه
export const shopItems = pgTable('shop_items', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // avatar, frame, background, effect, accessory
  name: text('name').notNull(),
  description: text('description'),
  imagePath: text('image_path').notNull(),
  price: integer('price').notNull(),
  xpPrice: integer('xp_price'),
  currency: text('currency').notNull().default('credit'), // credit, real, xp
  rarity: text('rarity').notNull().default('common'),
  category: text('category').notNull(),
  tags: text('tags').array(),
  avatarId: integer('avatar_id').references(() => avatars.id),
  isAvailable: boolean('is_available').notNull().default(true),
  isLimited: boolean('is_limited').default(false),
  limitedQuantity: integer('limited_quantity'),
  limitedRemaining: integer('limited_remaining'),
  requiredLevel: integer('required_level').default(1),
  releaseDate: timestamp('release_date').defaultNow(),
  expiryDate: timestamp('expiry_date'),
  effects: jsonb('effects'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ویژگی‌های ویژه آواتار که در فروشگاه قابل خرید هستند
export const avatarFeatures = pgTable('avatar_features', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // frame, background, effect, accessory
  imagePath: text('image_path'),
  isDefault: boolean('is_default').notNull().default(false),
  rarity: text('rarity').notNull().default('common'),
  effects: jsonb('effects'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// آواتارهای کاربر
export const userAvatars = pgTable('user_avatars', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  avatarId: integer('avatar_id').references(() => avatars.id).notNull(),
  isActive: boolean('is_active').notNull().default(false),
  customName: text('custom_name'),
  level: integer('level').notNull().default(1),
  xp: integer('xp').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ویژگی‌های فعال آواتار کاربر
export const userAvatarFeatures = pgTable('user_avatar_features', {
  id: serial('id').primaryKey(),
  userAvatarId: integer('user_avatar_id').references(() => userAvatars.id).notNull(),
  featureId: integer('feature_id').references(() => avatarFeatures.id).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  purchaseDate: timestamp('purchase_date').notNull().defaultNow(),
  expiryDate: timestamp('expiry_date'),
});

// آیتم‌های خریداری شده توسط کاربر
export const userItems = pgTable('user_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  itemId: integer('item_id').references(() => shopItems.id).notNull(),
  purchaseDate: timestamp('purchase_date').notNull().defaultNow(),
  expiryDate: timestamp('expiry_date'),
  isActive: boolean('is_active').notNull().default(true),
  isUsed: boolean('is_used').notNull().default(false),
  usedDate: timestamp('used_date'),
});

// تراکنش‌های کیف پول کاربر
export const walletTransactions = pgTable('wallet_transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(),
  type: text('type').notNull(), // deposit, withdrawal, purchase
  description: text('description'),
  currency: text('currency').notNull().default('credit'), // credit, xp
  referenceType: text('reference_type'), // item, avatar, feature
  referenceId: integer('reference_id'),
  status: text('status').notNull().default('completed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// کمپین‌های تبلیغاتی و تخفیف‌ها
export const promotions = pgTable('promotions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  discountPercentage: integer('discount_percentage'),
  discountAmount: integer('discount_amount'),
  code: text('code'),
  itemType: text('item_type'), // avatar, frame, accessory, all
  itemId: integer('item_id'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// روابط آواتارها
export const avatarsRelations = relations(avatars, ({ many }) => ({
  shopItems: many(shopItems),
  userAvatars: many(userAvatars),
}));

// روابط آیتم‌های فروشگاه
export const shopItemsRelations = relations(shopItems, ({ one, many }) => ({
  avatar: one(avatars, {
    fields: [shopItems.avatarId],
    references: [avatars.id],
  }),
  userItems: many(userItems),
}));

// روابط ویژگی‌های آواتار
export const avatarFeaturesRelations = relations(avatarFeatures, ({ many }) => ({
  userFeatures: many(userAvatarFeatures),
}));

// روابط آواتارهای کاربر
export const userAvatarsRelations = relations(userAvatars, ({ one, many }) => ({
  avatar: one(avatars, {
    fields: [userAvatars.avatarId],
    references: [avatars.id],
  }),
  user: one(users, {
    fields: [userAvatars.userId],
    references: [users.id],
  }),
  features: many(userAvatarFeatures),
}));

// روابط ویژگی‌های آواتار کاربر
export const userAvatarFeaturesRelations = relations(userAvatarFeatures, ({ one }) => ({
  userAvatar: one(userAvatars, {
    fields: [userAvatarFeatures.userAvatarId],
    references: [userAvatars.id],
  }),
  feature: one(avatarFeatures, {
    fields: [userAvatarFeatures.featureId],
    references: [avatarFeatures.id],
  }),
}));

// روابط آیتم‌های کاربر
export const userItemsRelations = relations(userItems, ({ one }) => ({
  user: one(users, {
    fields: [userItems.userId],
    references: [users.id],
  }),
  item: one(shopItems, {
    fields: [userItems.itemId],
    references: [shopItems.id],
  }),
}));

// روابط تراکنش‌های کیف پول
export const walletTransactionsRelations = relations(walletTransactions, ({ one }) => ({
  user: one(users, {
    fields: [walletTransactions.userId],
    references: [users.id],
  }),
}));

// اسکیماهای Zod برای سیستم آواتار
export const insertAvatarSchema = createInsertSchema(avatars).omit({ id: true, createdAt: true, updatedAt: true });
export const insertShopItemSchema = createInsertSchema(shopItems).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAvatarFeatureSchema = createInsertSchema(avatarFeatures).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserAvatarSchema = createInsertSchema(userAvatars).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserAvatarFeatureSchema = createInsertSchema(userAvatarFeatures).omit({ id: true });
export const insertUserItemSchema = createInsertSchema(userItems).omit({ id: true });
export const insertWalletTransactionSchema = createInsertSchema(walletTransactions).omit({ id: true, createdAt: true });
export const insertPromotionSchema = createInsertSchema(promotions).omit({ id: true, createdAt: true, updatedAt: true });

// تایپ‌های مورد استفاده برای سیستم آواتار
export type Avatar = typeof avatars.$inferSelect;
export type InsertAvatar = z.infer<typeof insertAvatarSchema>;

export type ShopItem = typeof shopItems.$inferSelect;
export type InsertShopItem = z.infer<typeof insertShopItemSchema>;

export type AvatarFeature = typeof avatarFeatures.$inferSelect;
export type InsertAvatarFeature = z.infer<typeof insertAvatarFeatureSchema>;

export type UserAvatar = typeof userAvatars.$inferSelect;
export type InsertUserAvatar = z.infer<typeof insertUserAvatarSchema>;

export type UserAvatarFeature = typeof userAvatarFeatures.$inferSelect;
export type InsertUserAvatarFeature = z.infer<typeof insertUserAvatarFeatureSchema>;

export type UserItem = typeof userItems.$inferSelect;
export type InsertUserItem = z.infer<typeof insertUserItemSchema>;

export type WalletTransaction = typeof walletTransactions.$inferSelect;
export type InsertWalletTransaction = z.infer<typeof insertWalletTransactionSchema>;

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;