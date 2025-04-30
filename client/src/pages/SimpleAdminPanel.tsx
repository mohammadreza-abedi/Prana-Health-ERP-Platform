import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  Image, 
  Database, 
  ChevronRight, 
  Search, 
  Bell, 
  BarChart3,
  ShieldCheck,
  Palette,
  MessageSquare,
  Globe
} from "lucide-react";

export default function SimpleAdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">پنل مدیریت</h1>
          <p className="text-muted-foreground mt-1">مدیریت و پیکربندی سیستم پرانا</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 bg-blue-950/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>مدیر سیستم</span>
          </Badge>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <Card className="col-span-12 md:col-span-3 bg-card/80 backdrop-blur-lg border-primary/10">
          <CardContent className="p-4">
            <div className="space-y-1 mb-6">
              <Label>جستجو</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجو در تنظیمات..." className="pr-3 pl-10" />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(80vh-180px)]">
              <div className="space-y-1">
                <Button
                  variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  داشبورد
                </Button>
                
                <Separator className="my-2" />
                <Label className="px-4 text-xs text-muted-foreground">مدیریت محتوا</Label>
                
                <Button
                  variant={activeTab === "pages" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("pages")}
                >
                  <FileText className="ml-2 h-4 w-4" />
                  صفحات
                </Button>
                
                <Button
                  variant={activeTab === "media" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("media")}
                >
                  <Image className="ml-2 h-4 w-4" />
                  رسانه
                </Button>
                
                <Separator className="my-2" />
                <Label className="px-4 text-xs text-muted-foreground">مدیریت سیستم</Label>
                
                <Button
                  variant={activeTab === "users" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="ml-2 h-4 w-4" />
                  کاربران
                </Button>
                
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="ml-2 h-4 w-4" />
                  تنظیمات
                </Button>
                
                <Button
                  variant={activeTab === "analytics" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="ml-2 h-4 w-4" />
                  آمار
                </Button>
                
                <Button
                  variant={activeTab === "database" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("database")}
                >
                  <Database className="ml-2 h-4 w-4" />
                  دیتابیس
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-lg border-primary/10">
                <CardHeader>
                  <CardTitle>خلاصه وضعیت سیستم</CardTitle>
                  <CardDescription>اطلاعات کلی و آمارهای مهم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard 
                      title="کاربران" 
                      value="1,274" 
                      change="+12%" 
                      icon={<Users className="h-8 w-8 text-blue-400" />} 
                    />
                    <StatCard 
                      title="بازدید امروز" 
                      value="3,825" 
                      change="+18%" 
                      icon={<Globe className="h-8 w-8 text-emerald-400" />} 
                    />
                    <StatCard 
                      title="چالش‌های فعال" 
                      value="37" 
                      change="+5%" 
                      icon={<BarChart3 className="h-8 w-8 text-purple-400" />} 
                    />
                    <StatCard 
                      title="اعلان‌ها" 
                      value="28" 
                      change="" 
                      icon={<Bell className="h-8 w-8 text-amber-400" />} 
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/80 backdrop-blur-lg border-primary/10">
                  <CardHeader>
                    <CardTitle>فعالیت اخیر سیستم</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityLog />
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-lg border-primary/10">
                  <CardHeader>
                    <CardTitle>وضعیت سرور</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">CPU</p>
                          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '23%' }}></div>
                          </div>
                        </div>
                        <Badge>23%</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">رم</p>
                          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48%' }}></div>
                          </div>
                        </div>
                        <Badge>48%</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">فضای دیسک</p>
                          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                        <Badge>72%</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">پهنای باند</p>
                          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '38%' }}></div>
                          </div>
                        </div>
                        <Badge>38%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card className="bg-card/80 backdrop-blur-lg border-primary/10">
              <CardHeader>
                <CardTitle>تنظیمات سیستم</CardTitle>
                <CardDescription>تنظیمات اصلی سیستم پرانا</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general">
                  <TabsList className="mb-6">
                    <TabsTrigger value="general">عمومی</TabsTrigger>
                    <TabsTrigger value="appearance">ظاهر</TabsTrigger>
                    <TabsTrigger value="security">امنیت</TabsTrigger>
                    <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="site-title">عنوان سایت</Label>
                          <Input id="site-title" defaultValue="پرانا - دستیار هوشمند سلامت" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="site-url">آدرس سایت</Label>
                          <Input id="site-url" defaultValue="https://prana.health" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="site-description">توضیحات سایت</Label>
                        <Textarea 
                          id="site-description" 
                          rows={3} 
                          defaultValue="پلتفرم جامع مدیریت سلامت سازمانی با قابلیت‌های گیمیفیکیشن" 
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">تنظیمات سیستم</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>حالت تعمیر و نگهداری</Label>
                              <p className="text-sm text-muted-foreground">فعال کردن حالت تعمیر و نگهداری وب‌سایت</p>
                            </div>
                            <Switch id="maintenance-mode" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>ثبت نام کاربران</Label>
                              <p className="text-sm text-muted-foreground">اجازه ثبت نام کاربران جدید</p>
                            </div>
                            <Switch id="user-registration" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>بهینه‌سازی خودکار</Label>
                              <p className="text-sm text-muted-foreground">بهینه‌سازی خودکار پایگاه داده و کش</p>
                            </div>
                            <Switch id="auto-optimization" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="appearance">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>تم پیش‌فرض</Label>
                        <div className="flex flex-wrap gap-2">
                          <Toggle 
                            variant="outline" 
                            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground" 
                            defaultPressed
                          >
                            <Palette className="ml-1 h-4 w-4" />
                            تاریک
                          </Toggle>
                          <Toggle variant="outline">
                            <Palette className="ml-1 h-4 w-4" />
                            روشن
                          </Toggle>
                          <Toggle variant="outline">
                            <Palette className="ml-1 h-4 w-4" />
                            سیستم
                          </Toggle>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>انیمیشن‌ها</Label>
                        <div className="flex flex-wrap gap-2">
                          <Toggle 
                            variant="outline" 
                            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground" 
                            defaultPressed
                          >
                            پیشرفته
                          </Toggle>
                          <Toggle variant="outline">
                            ساده
                          </Toggle>
                          <Toggle variant="outline">
                            غیرفعال
                          </Toggle>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label>رنگ اصلی</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary border border-border"></div>
                            <Input defaultValue="#8b5cf6" className="font-mono" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>رنگ ثانویه</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-secondary border border-border"></div>
                            <Input defaultValue="#1e293b" className="font-mono" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>رنگ تاکید</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent border border-border"></div>
                            <Input defaultValue="#38bdf8" className="font-mono" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="custom-css">CSS سفارشی</Label>
                        <Textarea 
                          id="custom-css" 
                          rows={5} 
                          className="font-mono text-sm" 
                          placeholder="/* کد CSS سفارشی خود را اینجا وارد کنید */" 
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">تنظیمات امنیتی</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>احراز هویت دو مرحله‌ای</Label>
                            <p className="text-sm text-muted-foreground">الزام استفاده از احراز هویت دو مرحله‌ای برای کاربران</p>
                          </div>
                          <Switch id="2fa" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>حفاظت از حملات CSRF</Label>
                            <p className="text-sm text-muted-foreground">فعال کردن حفاظت در برابر حملات CSRF</p>
                          </div>
                          <Switch id="csrf-protection" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>محدودیت نرخ درخواست</Label>
                            <p className="text-sm text-muted-foreground">محدود کردن تعداد درخواست‌ها به API</p>
                          </div>
                          <Switch id="rate-limit" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="password-min-length">حداقل طول رمز عبور</Label>
                            <Input id="password-min-length" type="number" defaultValue="8" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="session-timeout">زمان انقضای نشست (دقیقه)</Label>
                            <Input id="session-timeout" type="number" defaultValue="60" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="allowed-ips">آدرس‌های IP مجاز (جدا شده با کاما)</Label>
                          <Input id="allowed-ips" placeholder="همه IP ها" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">تنظیمات ایمیل</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="smtp-host">SMTP Host</Label>
                            <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-port">SMTP Port</Label>
                            <Input id="smtp-port" defaultValue="587" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-user">SMTP Username</Label>
                            <Input id="smtp-user" defaultValue="info@prana.health" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-pass">SMTP Password</Label>
                            <Input id="smtp-pass" type="password" defaultValue="••••••••••••" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">اعلان‌های سیستم</h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>اعلان‌های ایمیل</Label>
                              <p className="text-sm text-muted-foreground">ارسال اعلان‌های سیستم از طریق ایمیل</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>اعلان‌های پیامکی</Label>
                              <p className="text-sm text-muted-foreground">ارسال اعلان‌های سیستم از طریق پیامک</p>
                            </div>
                            <Switch id="sms-notifications" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>اعلان‌های وب پوش</Label>
                              <p className="text-sm text-muted-foreground">ارسال اعلان‌های سیستم از طریق وب پوش</p>
                            </div>
                            <Switch id="push-notifications" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">انصراف</Button>
                <Button>ذخیره تغییرات</Button>
              </CardFooter>
            </Card>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card className="bg-card/80 backdrop-blur-lg border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>مدیریت کاربران</CardTitle>
                  <CardDescription>مشاهده و مدیریت کاربران سیستم</CardDescription>
                </div>
                <Button size="sm">
                  افزودن کاربر جدید
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center gap-2">
                      <Label>جستجو:</Label>
                      <Input className="w-64" placeholder="جستجو بر اساس نام، ایمیل یا نقش..." />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label>نمایش:</Label>
                      <select className="p-2 rounded-md border bg-background">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-right font-medium">نام</th>
                        <th className="py-3 px-4 text-right font-medium">ایمیل</th>
                        <th className="py-3 px-4 text-right font-medium">نقش</th>
                        <th className="py-3 px-4 text-right font-medium">وضعیت</th>
                        <th className="py-3 px-4 text-right font-medium">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <UserRow 
                        name="علی محمدی" 
                        email="ali@example.com" 
                        role="مدیر" 
                        status="فعال" 
                      />
                      <UserRow 
                        name="مریم احمدی" 
                        email="maryam@example.com" 
                        role="کارمند" 
                        status="فعال" 
                      />
                      <UserRow 
                        name="حسین رضایی" 
                        email="hossein@example.com" 
                        role="کارمند" 
                        status="غیرفعال" 
                      />
                      <UserRow 
                        name="سارا کریمی" 
                        email="sara@example.com" 
                        role="ناظر HSE" 
                        status="فعال" 
                      />
                      <UserRow 
                        name="رضا حسینی" 
                        email="reza@example.com" 
                        role="مدیر ارشد" 
                        status="فعال" 
                      />
                    </tbody>
                  </table>
                  <div className="p-4 flex justify-between items-center border-t">
                    <div className="text-sm text-muted-foreground">
                      نمایش 1 تا 5 از 35 کاربر
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" disabled>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-9 h-9" disabled>1</Button>
                      <Button variant="outline" size="sm" className="w-9 h-9">2</Button>
                      <Button variant="outline" size="sm" className="w-9 h-9">3</Button>
                      <Button variant="outline" size="sm" className="w-9 h-9">4</Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Component for user row in the users table
function UserRow({ name, email, role, status }: { name: string; email: string; role: string; status: string }) {
  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4 font-mono text-sm">{email}</td>
      <td className="py-3 px-4">
        <Badge variant="outline" className="bg-primary/5">
          {role}
        </Badge>
      </td>
      <td className="py-3 px-4">
        {status === "فعال" ? (
          <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20">فعال</Badge>
        ) : (
          <Badge variant="outline" className="bg-red-500/20 text-red-500 hover:bg-red-500/20">غیرفعال</Badge>
        )}
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// Component for stat card in the dashboard
function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/30 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && (
          <Badge className="mt-1 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20">
            {change}
          </Badge>
        )}
      </div>
      <div className="p-3 rounded-lg bg-primary/10">
        {icon}
      </div>
    </div>
  );
}

// Component for activity log
function ActivityLog() {
  return (
    <div className="space-y-4">
      <ActivityItem 
        action="ورود به سیستم" 
        user="مریم احمدی" 
        time="دقایقی پیش" 
        icon={<Users className="h-4 w-4 text-blue-400" />} 
      />
      <ActivityItem 
        action="افزودن صفحه جدید" 
        user="علی محمدی" 
        time="1 ساعت پیش" 
        icon={<FileText className="h-4 w-4 text-emerald-400" />} 
      />
      <ActivityItem 
        action="تغییر تنظیمات سیستم" 
        user="رضا حسینی" 
        time="3 ساعت پیش" 
        icon={<Settings className="h-4 w-4 text-amber-400" />} 
      />
      <ActivityItem 
        action="آپلود فایل جدید" 
        user="سارا کریمی" 
        time="5 ساعت پیش" 
        icon={<Image className="h-4 w-4 text-purple-400" />} 
      />
      <ActivityItem 
        action="حذف کاربر" 
        user="رضا حسینی" 
        time="1 روز پیش" 
        icon={<Users className="h-4 w-4 text-red-400" />} 
      />
    </div>
  );
}

// Component for activity item
function ActivityItem({ action, user, time, icon }: { action: string; user: string; time: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-primary/10">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{action}</span> توسط <span className="font-medium">{user}</span>
        </p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  );
}