import { useState } from "react";
import { Shield, Settings, Users, Layers, Database, Code, BarChart2, RefreshCw, Terminal, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const SimpleAdminPanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // بخش‌های اصلی پنل ادمین
  const sections = [
    { id: 'dashboard', title: 'داشبورد مدیریت', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'pages', title: 'مدیریت صفحات', icon: <Layers className="h-4 w-4" /> },
    { id: 'components', title: 'مدیریت کامپوننت‌ها', icon: <Code className="h-4 w-4" /> },
    { id: 'users', title: 'مدیریت کاربران', icon: <Users className="h-4 w-4" /> },
    { id: 'settings', title: 'تنظیمات سیستم', icon: <Settings className="h-4 w-4" /> },
    { id: 'database', title: 'مدیریت دیتابیس', icon: <Database className="h-4 w-4" /> },
  ];

  // پویانمایی برای سایدبار
  const sidebarAnimation = {
    open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 70, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const handleSectionClick = (id: string) => {
    setActiveTab(id);
    toast({
      title: "بخش انتخاب شد",
      description: `بخش «${sections.find(s => s.id === id)?.title}» انتخاب شد.`,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* سایدبار پنل ادمین */}
      <motion.aside
        initial="open"
        animate={isExpanded ? "open" : "closed"}
        variants={sidebarAnimation}
        className="h-screen bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto overflow-x-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-lg text-slate-900 dark:text-white flex items-center"
            >
              <Shield className="h-5 w-5 ml-2 text-tiffany" />
              <span>پنل ادمین</span>
            </motion.div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ArrowLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center p-2 rounded-md transition-all duration-200 
                  ${activeTab === section.id 
                    ? 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany-light'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}
                  ${isExpanded ? 'justify-between' : 'justify-center'}`}
              >
                <span className="flex items-center">
                  <span className="transition-transform duration-200">
                    {section.icon}
                  </span>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mr-3 text-sm font-medium"
                    >
                      {section.title}
                    </motion.span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <Button 
            variant="destructive" 
            size={isExpanded ? "default" : "icon"} 
            className="w-full"
          >
            <Shield className="h-4 w-4" />
            {isExpanded && <span className="mr-2">خروج از حالت ادمین</span>}
          </Button>
        </div>
      </motion.aside>
      
      {/* محتوای اصلی */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">پنل مدیریت</h1>
          <p className="text-slate-500 dark:text-slate-400">
            به پنل مدیریت پرانا خوش آمدید. از منوی سمت راست می‌توانید بخش‌های مختلف را مدیریت کنید.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id}>
                <span className="flex items-center gap-2">
                  {section.icon}
                  <span>{section.title}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>آمار کلی سیستم</CardTitle>
                <CardDescription>داده‌های آماری کلیدی پلتفرم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">کاربران فعال</p>
                      <p className="text-2xl font-bold">2845</p>
                    </div>
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">تعداد صفحات</p>
                      <p className="text-2xl font-bold">48</p>
                    </div>
                    <Layers className="h-5 w-5 text-tiffany" />
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">کامپوننت‌ها</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    <Code className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت صفحات</CardTitle>
                <CardDescription>در این بخش می‌توانید صفحات وب‌سایت را مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>این ویژگی در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت کامپوننت‌ها</CardTitle>
                <CardDescription>در این بخش می‌توانید کامپوننت‌های وب‌سایت را مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>این ویژگی در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت کاربران</CardTitle>
                <CardDescription>در این بخش می‌توانید کاربران سیستم را مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>این ویژگی در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات سیستم</CardTitle>
                <CardDescription>در این بخش می‌توانید تنظیمات سیستم را مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>این ویژگی در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت دیتابیس</CardTitle>
                <CardDescription>در این بخش می‌توانید پایگاه داده سیستم را مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>این ویژگی در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SimpleAdminPanel;