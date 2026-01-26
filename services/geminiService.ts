
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the ISEYAA AI Agent, the digital brain of Ogun State's Integrated Sports, Events, Youth, Arts & Attractions platform.
Your role is to assist citizens, tourists, and businesses in navigating the Ogun State digital economy.

Tone: Professional, helpful, efficient, and welcoming.
You have access to Google Maps grounding. Use it to provide accurate directions, find nearby services, and verify locations in Ogun State.
When you use Google Maps data, ensure the user knows they can follow the provided links for navigation.
Keep responses concise and formatted for a chat interface.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<{ text: string, groundingChunks?: any[] }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const firstUserIndex = history.findIndex(h => h.role === 'user');
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

    const contents = [
      ...validHistory.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: h.parts
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    let latLng = undefined;
    try {
        const pos = await new Promise<GeolocationPosition>((res, rej) => 
            navigator.geolocation.getCurrentPosition(res, rej, { timeout: 3000 })
        );
        latLng = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };
    } catch (e) {
        console.warn("Geolocation not available for grounding");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        tools: [{ googleMaps: {} }],
        toolConfig: latLng ? {
          retrievalConfig: {
            latLng: latLng
          }
        } : undefined
      }
    });

    return {
      text: response.text || "I'm processing your request but couldn't generate a text response right now.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I apologize, but I'm having trouble connecting to the ISEYAA central node right now. Please check your connection and try again." };
  }
};

export const fetchOgunLatestNews = async (): Promise<any[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `HYPER-SEARCH & DISPATCH: Target Ogun State, Nigeria. 
      SOURCE NODES: X/Twitter (Viral), Instagram (Trends), Facebook (Community), Channels TV, Punch, BBC Africa, and local radio FM transcripts. 
      DATA DENSITY: Find high-impact breaking news from the last 2 hours. Include economic spikes, sporting drama (Gateway Utd), and youth culture shifts.
      TRANSFORMATION: Generate punchy, authoritative headlines and 2-sentence kinetic summaries designed for a 2-second refresh cycle. 
      JSON SCHEMA: Array of objects with title, summary, source, author, url, category, imageUrl, and a calculated SEO intensity score (1-100).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Hyper-optimized viral headline" },
              summary: { type: Type.STRING, description: "Viral-ready engaging summary" },
              source: { type: Type.STRING, description: "Original platform (e.g. X/Twitter, Punch)" },
              author: { type: Type.STRING, description: "Account name or Journalist" },
              url: { type: Type.STRING, description: "Direct link to signal" },
              category: { type: Type.STRING, description: "Social, Sports, Gov, or Economy" },
              imageUrl: { type: Type.STRING },
              seoScore: { type: Type.NUMBER, description: "SEO Indexability 1-100" }
            },
            required: ["title", "summary", "source", "url"]
          }
        }
      }
    });

    try {
        return JSON.parse(response.text || "[]");
    } catch (e) {
        console.error("JSON Parse Error on News", e);
        return [];
    }
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};

export const generateImageWithGemini = async (prompt: string): Promise<{text: string, imageUrl?: string}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
    });

    let text = "";
    let imageUrl = undefined;

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      } else if (part.text) {
        text += part.text;
      }
    }

    return { text: text || "Here is the visual representation based on your request:", imageUrl };
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
