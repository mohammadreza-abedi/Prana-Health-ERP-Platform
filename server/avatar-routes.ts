import { Router, Request, Response } from 'express';
import { db } from './db';
import { eq, desc, and } from 'drizzle-orm';

// گسترش تایپ Request برای پشتیبانی از isAuthenticated و user
declare global {
  namespace Express {
    interface Request {
      isAuthenticated(): boolean;
      user: any;
    }
  }
}
import { 
  avatars, 
  shopItems, 
  userAvatars, 
  userItems, 
  walletTransactions,
  userAvatarFeatures,
  avatarFeatures
} from '../shared/avatar-schema';
import { users } from '../shared/schema';

export const avatarRouter = Router();

// دریافت همه آواتارهای پایه
avatarRouter.get('/avatars', async (req, res) => {
  try {
    const allAvatars = await db.select().from(avatars).orderBy(desc(avatars.rarity));
    res.json(allAvatars);
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ error: 'خطا در دریافت آواتارها' });
  }
});

// دریافت همه آیتم‌های فروشگاه
avatarRouter.get('/avatar-shop/items', async (req, res) => {
  try {
    const allItems = await db.select().from(shopItems).orderBy(desc(shopItems.rarity));
    res.json(allItems);
  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({ error: 'خطا در دریافت آیتم‌های فروشگاه' });
  }
});

// دریافت آیتم‌های خریداری شده توسط کاربر
avatarRouter.get('/avatar-shop/user-items', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا وارد شوید' });
  }

  try {
    const userItemsList = await db
      .select()
      .from(userItems)
      .where(eq(userItems.userId, req.user.id));
    res.json(userItemsList);
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).json({ error: 'خطا در دریافت آیتم‌های کاربر' });
  }
});

// دریافت آواتارهای کاربر
avatarRouter.get('/user-avatars', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا وارد شوید' });
  }

  try {
    const userAvatarsList = await db
      .select()
      .from(userAvatars)
      .where(eq(userAvatars.userId, req.user.id));
    res.json(userAvatarsList);
  } catch (error) {
    console.error('Error fetching user avatars:', error);
    res.status(500).json({ error: 'خطا در دریافت آواتارهای کاربر' });
  }
});

// خرید آیتم از فروشگاه
avatarRouter.post('/avatar-shop/purchase', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا وارد شوید' });
  }

  const { itemId } = req.body;
  
  if (!itemId) {
    return res.status(400).json({ error: 'شناسه آیتم مورد نیاز است' });
  }

  // شروع تراکنش برای اطمینان از انسجام داده‌ها
  try {
    return await db.transaction(async (tx) => {
      // بررسی اینکه آیتم وجود دارد
      const [item] = await tx
        .select()
        .from(shopItems)
        .where(eq(shopItems.id, itemId));

      if (!item) {
        return res.status(404).json({ error: 'آیتم مورد نظر یافت نشد' });
      }

      // بررسی اینکه آیتم در دسترس است
      if (!item.isAvailable) {
        return res.status(400).json({ error: 'این آیتم در حال حاضر در دسترس نیست' });
      }

      // بررسی محدودیت تعداد
      if (item.isLimited && item.limitedRemaining && item.limitedRemaining <= 0) {
        return res.status(400).json({ error: 'این آیتم محدود به پایان رسیده است' });
      }

      // بررسی اینکه کاربر قبلاً این آیتم را خریداری کرده است
      const [existingItem] = await tx
        .select()
        .from(userItems)
        .where(and(
          eq(userItems.userId, req.user.id),
          eq(userItems.itemId, itemId)
        ));

      if (existingItem) {
        return res.status(400).json({ error: 'شما قبلاً این آیتم را خریداری کرده‌اید' });
      }

      // بررسی سطح مورد نیاز
      if (item.requiredLevel && req.user.level < item.requiredLevel) {
        return res.status(400).json({ 
          error: `برای خرید این آیتم به سطح ${item.requiredLevel} نیاز دارید` 
        });
      }

      // بررسی اعتبار کافی
      if (req.user.credits < item.price) {
        return res.status(400).json({ 
          error: 'اعتبار کافی ندارید',
          required: item.price,
          available: req.user.credits
        });
      }

      // کاهش تعداد آیتم‌های محدود
      if (item.isLimited && item.limitedRemaining) {
        await tx
          .update(shopItems)
          .set({ limitedRemaining: item.limitedRemaining - 1 })
          .where(eq(shopItems.id, itemId));
      }

      // کاهش اعتبار کاربر
      await tx
        .update(users)
        .set({ credits: req.user.credits - item.price })
        .where(eq(users.id, req.user.id));

      // افزودن آیتم به آیتم‌های کاربر
      const [userItem] = await tx
        .insert(userItems)
        .values({
          userId: req.user.id,
          itemId: itemId,
          purchaseDate: new Date(),
          isActive: true,
          isUsed: false
        })
        .returning();

      // ثبت تراکنش کیف پول
      await tx
        .insert(walletTransactions)
        .values({
          userId: req.user.id,
          amount: -item.price,
          type: 'purchase',
          description: `خرید آیتم: ${item.name}`,
          currency: 'credit',
          referenceType: 'item',
          referenceId: itemId,
          status: 'completed'
        });

      // افزودن آواتار جدید اگر آیتم یک آواتار است
      if (item.type === 'avatar' && item.avatarId) {
        const [purchasedAvatar] = await tx
          .select()
          .from(avatars)
          .where(eq(avatars.id, item.avatarId));

        if (purchasedAvatar) {
          await tx
            .insert(userAvatars)
            .values({
              userId: req.user.id,
              avatarId: purchasedAvatar.id,
              isActive: false,
              customName: purchasedAvatar.name,
              level: 1,
              xp: 0
            });
        }
      }

      return res.status(200).json({ 
        success: true, 
        itemName: item.name,
        message: `آیتم ${item.name} با موفقیت خریداری شد` 
      });
    });
  } catch (error) {
    console.error('Error purchasing item:', error);
    return res.status(500).json({ error: 'خطا در خرید آیتم' });
  }
});

// تغییر آواتار فعال کاربر
avatarRouter.post('/user-avatars/set-active', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا وارد شوید' });
  }

  const { avatarId } = req.body;
  
  if (!avatarId) {
    return res.status(400).json({ error: 'شناسه آواتار مورد نیاز است' });
  }

  try {
    return await db.transaction(async (tx) => {
      // بررسی اینکه آواتار متعلق به کاربر است
      const [userAvatar] = await tx
        .select()
        .from(userAvatars)
        .where(and(
          eq(userAvatars.userId, req.user.id),
          eq(userAvatars.id, avatarId)
        ));

      if (!userAvatar) {
        return res.status(404).json({ error: 'آواتار مورد نظر یافت نشد' });
      }

      // غیرفعال کردن همه آواتارهای دیگر
      await tx
        .update(userAvatars)
        .set({ isActive: false })
        .where(eq(userAvatars.userId, req.user.id));

      // فعال کردن آواتار انتخاب شده
      await tx
        .update(userAvatars)
        .set({ isActive: true })
        .where(eq(userAvatars.id, avatarId));

      // به‌روزرسانی آواتار پیش‌فرض کاربر در جدول users
      const [avatarDetails] = await tx
        .select()
        .from(avatars)
        .where(eq(avatars.id, userAvatar.avatarId));

      if (avatarDetails && avatarDetails.imagePath) {
        await tx
          .update(users)
          .set({ avatar: avatarDetails.imagePath })
          .where(eq(users.id, req.user.id));
      }

      return res.status(200).json({ 
        success: true, 
        message: 'آواتار فعال با موفقیت تغییر کرد' 
      });
    });
  } catch (error) {
    console.error('Error setting active avatar:', error);
    return res.status(500).json({ error: 'خطا در تغییر آواتار فعال' });
  }
});

// اضافه کردن ویژگی به آواتار کاربر
avatarRouter.post('/user-avatars/add-feature', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا وارد شوید' });
  }

  const { userAvatarId, featureId } = req.body;
  
  if (!userAvatarId || !featureId) {
    return res.status(400).json({ error: 'شناسه آواتار کاربر و ویژگی مورد نیاز است' });
  }

  try {
    return await db.transaction(async (tx) => {
      // بررسی اینکه آواتار متعلق به کاربر است
      const [userAvatar] = await tx
        .select()
        .from(userAvatars)
        .where(and(
          eq(userAvatars.userId, req.user.id),
          eq(userAvatars.id, userAvatarId)
        ));

      if (!userAvatar) {
        return res.status(404).json({ error: 'آواتار کاربر یافت نشد' });
      }

      // بررسی اینکه ویژگی وجود دارد
      const [feature] = await tx
        .select()
        .from(avatarFeatures)
        .where(eq(avatarFeatures.id, featureId));

      if (!feature) {
        return res.status(404).json({ error: 'ویژگی مورد نظر یافت نشد' });
      }

      // بررسی اینکه کاربر قبلاً این ویژگی را به این آواتار اضافه کرده است
      const [existingFeature] = await tx
        .select()
        .from(userAvatarFeatures)
        .where(and(
          eq(userAvatarFeatures.userAvatarId, userAvatarId),
          eq(userAvatarFeatures.featureId, featureId)
        ));

      if (existingFeature) {
        return res.status(400).json({ error: 'این ویژگی قبلاً به آواتار شما اضافه شده است' });
      }

      // افزودن ویژگی به آواتار کاربر
      await tx
        .insert(userAvatarFeatures)
        .values({
          userAvatarId,
          featureId,
          isActive: true,
          purchaseDate: new Date()
        });

      return res.status(200).json({ 
        success: true, 
        message: `ویژگی ${feature.name} با موفقیت به آواتار شما اضافه شد` 
      });
    });
  } catch (error) {
    console.error('Error adding feature to user avatar:', error);
    return res.status(500).json({ error: 'خطا در اضافه کردن ویژگی به آواتار' });
  }
});