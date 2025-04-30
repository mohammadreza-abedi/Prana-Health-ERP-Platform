/**
 * @file ai-service.ts
 * @description سرویس ارتباط با هوش مصنوعی OpenAI
 * 
 * این سرویس مسئول برقراری ارتباط با API هوش مصنوعی OpenAI و ارائه خدمات
 * تحلیل متن، تصویر، و داده‌های مختلف است.
 */

import { apiRequest } from "@/lib/queryClient";

export interface AIAnalysisRequest {
  prompt: string;
  data?: any;
  options?: {
    temperature?: number;
    max_tokens?: number;
    model?: string;
    format?: 'text' | 'json' | 'html';
  };
}

export interface AICompletionResponse {
  content: string;
  model: string;
  id: string;
  created: number;
}

export interface AIError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * سرویس دسترسی به قابلیت‌های هوش مصنوعی OpenAI
 */
export const AIService = {
  /**
   * تحلیل داده‌های کاربر با استفاده از هوش مصنوعی
   * این تابع داده‌ها را به همراه یک پرامپت به API ارسال می‌کند
   */
  analyzeData: async (request: AIAnalysisRequest): Promise<AICompletionResponse> => {
    try {
      const response = await apiRequest('POST', '/api/ai/analyze', request);
      const data = await response.json();
      
      if (!response.ok) {
        throw {
          message: data.error || 'خطا در تحلیل داده با هوش مصنوعی',
          code: data.code,
          status: response.status
        };
      }
      
      return data;
    } catch (error) {
      console.error('خطا در ارتباط با سرویس هوش مصنوعی:', error);
      throw error;
    }
  },
  
  /**
   * تولید پیشنهادهای بهبود سلامت بر اساس داده‌های کاربر
   */
  generateHealthInsights: async (healthData: any): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: 'تحلیل وضعیت سلامت کاربر و ارائه توصیه‌های بهبود',
      data: healthData,
      options: {
        temperature: 0.3,
        model: 'gpt-4o',
        format: 'json'
      }
    });
  },
  
  /**
   * تحلیل عملکرد سازمانی و ارائه پیشنهادهای بهبود
   */
  analyzeOrganizationalPerformance: async (orgData: any): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: 'تحلیل عملکرد سازمانی و ارائه راهکارهای بهبود',
      data: orgData,
      options: {
        temperature: 0.2,
        model: 'gpt-4o',
        format: 'json'
      }
    });
  },
  
  /**
   * پیش‌بینی روندهای آینده بر اساس داده‌های تاریخی
   */
  predictTrends: async (historicalData: any): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: 'پیش‌بینی روندهای آینده بر اساس داده‌های تاریخی',
      data: historicalData,
      options: {
        temperature: 0.4,
        model: 'gpt-4o',
        format: 'json'
      }
    });
  },
  
  /**
   * تحلیل گزارش‌های سلامت کارکنان و ارائه بینش‌های کلی
   */
  analyzeHealthReports: async (reports: any[]): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: 'تحلیل گزارش‌های سلامت کارکنان و ارائه بینش‌های کلی',
      data: { reports },
      options: {
        temperature: 0.3,
        model: 'gpt-4o',
        format: 'json'
      }
    });
  },
  
  /**
   * شناسایی الگوهای خطرناک در داده‌های سلامت
   */
  identifyRiskPatterns: async (healthData: any): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: 'شناسایی الگوهای خطرناک در داده‌های سلامت و ارائه هشدارهای پیشگیرانه',
      data: healthData,
      options: {
        temperature: 0.2,
        model: 'gpt-4o',
        format: 'json'
      }
    });
  },
  
  /**
   * تولید محتوای آموزشی شخصی‌سازی شده در حوزه سلامت
   */
  generatePersonalizedContent: async (userProfile: any, topic: string): Promise<AICompletionResponse> => {
    return AIService.analyzeData({
      prompt: `تولید محتوای آموزشی شخصی‌سازی شده درباره "${topic}" برای کاربر با این پروفایل`,
      data: userProfile,
      options: {
        temperature: 0.7,
        model: 'gpt-4o',
        format: 'html'
      }
    });
  }
};

export default AIService;