import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useWebSocket } from "@/hooks/use-websocket";
import { useToast } from "@/hooks/use-toast";
import { Send, AlertCircle, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function NotificationSender() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { sendNotification, isConnected, connectionError } = useWebSocket();
  const { toast } = useToast();
  
  // Fetch users for the dropdown
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['/api/users/sample'],
  });
  
  const handleSendNotification = () => {
    if (!selectedUser || !message) {
      toast({
        title: "خطا",
        description: "لطفاً کاربر و پیام را وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isConnected) {
      toast({
        title: "خطا در اتصال",
        description: "ارتباط با سرور وب‌سوکت برقرار نیست. لطفاً دوباره تلاش کنید.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      sendNotification(parseInt(selectedUser), message);
      
      toast({
        title: "اطلاع‌رسانی ارسال شد",
        description: "پیام با موفقیت ارسال شد.",
        variant: "success"
      });
      
      // Reset form
      setMessage("");
    } catch (error) {
      toast({
        title: "خطا در ارسال",
        description: "خطایی هنگام ارسال پیام رخ داد.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="border border-tiffany/20 dark:border-navy/20 shadow-md overflow-hidden bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold mb-1">ارسال اطلاع‌رسانی</CardTitle>
        <CardDescription>پیام‌های آنی به کاربران پلتفرم ارسال کنید</CardDescription>
        
        {/* Connection Status */}
        <div className="mt-2 flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium">
            {isConnected ? 'متصل به سرور' : 'عدم اتصال'}
          </span>
          {connectionError && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>{connectionError}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="user">انتخاب گیرنده</Label>
            <Select 
              value={selectedUser} 
              onValueChange={setSelectedUser}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب کاربر" />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>در حال بارگذاری...</SelectItem>
                ) : (
                  users.map((user: any) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.displayName || user.username}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">پیام</Label>
            <div className="flex relative">
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را وارد کنید..."
                className="pr-10"
              />
              <Heart className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSendNotification}
          className="w-full gap-2 bg-gradient-to-r from-tiffany to-aqua hover:from-aqua hover:to-tiffany text-white"
          disabled={!isConnected || !selectedUser || !message}
        >
          <Send className="h-4 w-4" />
          ارسال اطلاع‌رسانی
        </Button>
      </CardFooter>
    </Card>
  );
}