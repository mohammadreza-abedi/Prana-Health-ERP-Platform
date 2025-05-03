import React from 'react';
import { AvatarShop } from '@/components/ui/avatar-pro-system/AvatarShop';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function AvatarShopPage() {
  return (
    <MainLayout>
      <Card className="flex-1 h-full overflow-hidden backdrop-blur-sm bg-background/60">
        <CardContent className="p-6 h-full overflow-hidden">
          <AvatarShop />
        </CardContent>
      </Card>
    </MainLayout>
  );
}