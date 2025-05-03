import React, { useState } from 'react';
import AvatarShop from '@/components/ui/avatar-pro-system/AvatarShop';
import { useToast } from '@/hooks/use-toast';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import { ShopItemData } from '@/components/ui/avatar-pro-system/AvatarShop';

export default function AvatarShopPage() {
  const { toast } = useToast();
  const [credits, setCredits] = useState(1200);

  // شبیه‌سازی خرید آیتم
  const handlePurchase = async (item: ShopItemData) => {
    if (credits < item.price) {
      return false;
    }
    
    // در یک اپلیکیشن واقعی، اینجا API call انجام می‌شود
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // کم کردن اعتبار کاربر
    setCredits(prev => prev - item.price);
    
    toast({
      title: "خرید موفقیت‌آمیز",
      description: `آیتم ${item.name} به کالکشن شما اضافه شد.`,
      variant: "success",
    });
    
    return true;
  };

  return (
    <Container className="max-w-7xl py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AvatarShop 
          initialData={{
            userLevel: 5,
            userXP: 2500,
            nextLevelXP: 5000,
            userCredits: credits
          }}
          onPurchase={handlePurchase}
        />
      </motion.div>
    </Container>
  );
}