import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Loader2, ShoppingCart, Sparkles, Lock, Star, Coins } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ShopItem, Avatar as AvatarType, UserItem } from '@shared/avatar-schema';
import { AvatarPreview } from './AvatarPreview';

const rarityColors = {
  common: 'bg-slate-400 text-slate-900',
  rare: 'bg-blue-500 text-white',
  epic: 'bg-purple-500 text-white',
  legendary: 'bg-amber-500 text-black',
};

const categoryIcons = {
  avatar: <Avatar />,
  frame: <div className="border-2 rounded-lg w-5 h-5" />,
  background: <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-5 h-5 rounded" />,
  effect: <Sparkles className="w-5 h-5" />,
  accessory: <span className="text-lg">👓</span>,
};

type ShopItemCardProps = {
  item: ShopItem;
  userCredits: number;
  userLevel: number;
  userItems: UserItem[];
  onPurchase: (itemId: number) => void;
};

const ShopItemCard: React.FC<ShopItemCardProps> = ({ 
  item, 
  userCredits, 
  userLevel, 
  userItems,
  onPurchase 
}) => {
  const isOwned = userItems.some(userItem => userItem.itemId === item.id);
  const canAfford = userCredits >= (item.price || 0);
  const hasLevel = userLevel >= (item.requiredLevel || 1);
  
  const rarityStyling = rarityColors[item.rarity as keyof typeof rarityColors] || rarityColors.common;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-102 backdrop-blur-sm bg-background/60">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className={`${rarityStyling}`}>
            {item.rarity.toUpperCase()}
          </Badge>
          {item.isLimited && (
            <Badge variant="secondary">محدود: {item.limitedRemaining}/{item.limitedQuantity}</Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2 leading-tight">{item.name}</CardTitle>
        <CardDescription className="text-xs">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="rounded-lg overflow-hidden h-40 bg-black/10 flex items-center justify-center">
          <img 
            src={item.imagePath} 
            alt={item.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0 gap-2">
        <div className="flex items-center gap-1">
          <Coins className="w-4 h-4 text-yellow-500" />
          <span className="font-bold">
            {item.price.toLocaleString('fa-IR')}
          </span>
        </div>
        {item.requiredLevel && item.requiredLevel > 1 && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="text-sm">سطح {item.requiredLevel}</span>
          </div>
        )}
        <Button 
          variant={isOwned ? "secondary" : (canAfford && hasLevel ? "default" : "outline")}
          size="sm"
          className="ml-auto"
          disabled={isOwned || !canAfford || !hasLevel}
          onClick={() => onPurchase(item.id)}
        >
          {isOwned ? (
            'خریداری شده'
          ) : !hasLevel ? (
            <><Lock className="w-3 h-3 mr-1" /> قفل</>
          ) : !canAfford ? (
            'اعتبار ناکافی'
          ) : (
            'خرید'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export function AvatarShop() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // دریافت آیتم‌های فروشگاه
  const { data: shopItems, isLoading: isLoadingShop } = useQuery<ShopItem[]>({
    queryKey: ['/api/avatar-shop/items'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/avatar-shop/items');
      return await res.json();
    },
  });

  // دریافت اطلاعات کاربر
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/user');
      return await res.json();
    },
  });

  // دریافت آیتم‌های خریداری شده کاربر
  const { data: userItems, isLoading: isLoadingUserItems } = useQuery<UserItem[]>({
    queryKey: ['/api/avatar-shop/user-items'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/avatar-shop/user-items');
      return await res.json();
    },
  });

  // خرید آیتم
  const handlePurchase = async (itemId: number) => {
    try {
      const res = await apiRequest('POST', '/api/avatar-shop/purchase', { itemId });
      const result = await res.json();
      
      toast({
        title: 'خرید موفقیت‌آمیز',
        description: `${result.itemName} با موفقیت خریداری شد!`,
      });
      
      // به‌روزرسانی داده‌ها
      queryClient.invalidateQueries({ queryKey: ['/api/avatar-shop/user-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
    } catch (error) {
      toast({
        title: 'خطا در خرید',
        description: 'مشکلی در خرید آیتم رخ داد. لطفا مجددا تلاش کنید.',
        variant: 'destructive',
      });
    }
  };

  // فیلتر کردن آیتم‌ها بر اساس دسته‌بندی
  const filteredItems = shopItems?.filter(item => {
    if (selectedTab === 'owned' && userItems) {
      return userItems.some(userItem => userItem.itemId === item.id);
    }
    
    if (selectedTab === 'available') {
      return item.isAvailable;
    }
    
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  // استخراج همه دسته‌بندی‌های موجود
  const categories = React.useMemo(() => {
    if (!shopItems) return [];
    const uniqueCategories = new Set(shopItems.map(item => item.category));
    return Array.from(uniqueCategories);
  }, [shopItems]);

  const isLoading = isLoadingShop || isLoadingUser || isLoadingUserItems;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">فروشگاه آواتار</h1>
          <p className="text-muted-foreground">آیتم‌های جدید و ویژه را کشف کنید</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-lg border">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">{userData?.credits?.toLocaleString('fa-IR') || 0}</span>
          </div>
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-lg border">
            <Star className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-lg">سطح {userData?.level || 1}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="available">موجود</TabsTrigger>
            <TabsTrigger value="owned">خریداری شده</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {categoryIcons[category as keyof typeof categoryIcons] || null}
                {category}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-grow h-[calc(100%-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
            {filteredItems?.map(item => (
              <ShopItemCard
                key={item.id}
                item={item}
                userCredits={userData?.credits || 0}
                userLevel={userData?.level || 1}
                userItems={userItems || []}
                onPurchase={handlePurchase}
              />
            ))}
            
            {(!filteredItems || filteredItems.length === 0) && (
              <div className="col-span-full flex flex-col items-center justify-center p-12 rounded-lg border border-dashed text-center">
                <ShoppingCart className="w-12 h-12 mb-4 text-muted-foreground" strokeWidth={1} />
                <h3 className="text-lg font-medium">هیچ آیتمی یافت نشد</h3>
                <p className="text-muted-foreground">
                  {selectedTab === 'owned' 
                    ? 'شما هنوز هیچ آیتمی خریداری نکرده‌اید.'
                    : 'هیچ آیتمی با فیلترهای انتخاب شده یافت نشد.'}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}