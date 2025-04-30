/**
 * @file ai.ts
 * @description ماژول سرور برای ارتباط با OpenAI API
 * 
 * این ماژول مسئول فراهم کردن دسترسی به قابلیت‌های هوش مصنوعی OpenAI است.
 */

import OpenAI from "openai";

// ایجاد نمونه کلاینت OpenAI
// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * تحلیل داده با استفاده از مدل هوش مصنوعی
 */
export async function analyzeWithAI(prompt: string, data: any, options: {
  temperature?: number;
  model?: string;
  max_tokens?: number;
  format?: 'text' | 'json' | 'html';
} = {}) {
  try {
    const {
      temperature = 0.3,
      model = 'gpt-4o',
      max_tokens = 1000,
      format = 'text'
    } = options;
    
    // ترکیب پرامپت و داده‌ها
    const systemContent = format === 'json' 
      ? "You are an AI assistant tasked with analyzing data and providing insights in JSON format. Always respond with valid JSON."
      : "You are an AI assistant tasked with analyzing data and providing detailed insights.";
    
    const userContent = `
${prompt}

Here's the data to analyze:
${JSON.stringify(data, null, 2)}

${format === 'json' ? 'Please respond with JSON only.' : ''}
${format === 'html' ? 'Please format your response with HTML markup.' : ''}
`;
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent }
      ],
      temperature,
      max_tokens,
      ...(format === 'json' && { response_format: { type: "json_object" } })
    });
    
    return {
      content: response.choices[0].message.content,
      model: response.model,
      id: response.id,
      created: response.created,
    };
  } catch (error) {
    console.error('Error in AI analysis:', error);
    throw error;
  }
}

/**
 * تحلیل تصویر با استفاده از مدل هوش مصنوعی
 */
export async function analyzeImageWithAI(prompt: string, imageBase64: string, options: {
  temperature?: number;
  model?: string;
  max_tokens?: number;
} = {}) {
  try {
    const {
      temperature = 0.3,
      model = 'gpt-4o',
      max_tokens = 1000
    } = options;
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      temperature,
      max_tokens
    });
    
    return {
      content: response.choices[0].message.content,
      model: response.model,
      id: response.id,
      created: response.created,
    };
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw error;
  }
}

/**
 * تولید محتوا با استفاده از مدل هوش مصنوعی
 */
export async function generateContentWithAI(prompt: string, options: {
  temperature?: number;
  model?: string;
  max_tokens?: number;
  format?: 'text' | 'json' | 'html';
} = {}) {
  try {
    const {
      temperature = 0.7,
      model = 'gpt-4o',
      max_tokens = 1500,
      format = 'text'
    } = options;
    
    const systemContent = format === 'json' 
      ? "You are an AI content generator that outputs in JSON format. Always respond with valid JSON."
      : format === 'html'
        ? "You are an AI content generator that outputs in HTML format. Create well-structured HTML content."
        : "You are an AI content generator that creates high-quality content.";
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: prompt }
      ],
      temperature,
      max_tokens,
      ...(format === 'json' && { response_format: { type: "json_object" } })
    });
    
    return {
      content: response.choices[0].message.content,
      model: response.model,
      id: response.id,
      created: response.created,
    };
  } catch (error) {
    console.error('Error in content generation:', error);
    throw error;
  }
}

/**
 * پیش‌بینی روند با استفاده از مدل هوش مصنوعی
 */
export async function predictTrendsWithAI(data: any, timeframe: string, options: {
  temperature?: number;
  model?: string;
  max_tokens?: number;
} = {}) {
  try {
    const {
      temperature = 0.4,
      model = 'gpt-4o',
      max_tokens = 1000
    } = options;
    
    const prompt = `
Analyze this historical data and predict trends for the ${timeframe} timeframe. 
Provide your predictions in a structured JSON format that includes:
1. Key predicted metrics
2. Confidence levels for each prediction
3. Potential factors affecting these predictions
4. Recommended actions based on predictions

Data:
${JSON.stringify(data, null, 2)}
`;
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { 
          role: "system", 
          content: "You are an AI prediction assistant specialized in analyzing data and forecasting trends. Respond with JSON only." 
        },
        { role: "user", content: prompt }
      ],
      temperature,
      max_tokens,
      response_format: { type: "json_object" }
    });
    
    return {
      content: response.choices[0].message.content,
      model: response.model,
      id: response.id,
      created: response.created,
    };
  } catch (error) {
    console.error('Error in trend prediction:', error);
    throw error;
  }
}

/**
 * تحلیل متن آزاد با استفاده از مدل هوش مصنوعی
 */
export async function analyzeTextWithAI(text: string, analysisType: string, options: {
  temperature?: number;
  model?: string;
  max_tokens?: number;
} = {}) {
  try {
    const {
      temperature = 0.3,
      model = 'gpt-4o',
      max_tokens = 1000
    } = options;
    
    const prompt = `
Perform a ${analysisType} analysis on the following text. Provide detailed insights.

Text to analyze:
${text}
`;
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { 
          role: "system", 
          content: "You are an AI text analysis assistant specialized in extracting insights from text data." 
        },
        { role: "user", content: prompt }
      ],
      temperature,
      max_tokens
    });
    
    return {
      content: response.choices[0].message.content,
      model: response.model,
      id: response.id,
      created: response.created,
    };
  } catch (error) {
    console.error('Error in text analysis:', error);
    throw error;
  }
}

/**
 * صادرات توابع ماژول هوش مصنوعی
 */
export default {
  analyzeWithAI,
  analyzeImageWithAI,
  generateContentWithAI,
  predictTrendsWithAI,
  analyzeTextWithAI
};