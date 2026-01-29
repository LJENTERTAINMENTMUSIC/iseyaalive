import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the ISEYAA AI Agent, the digital brain of Ogun State's platform.
Your role: Assistant for citizens, tourists, and businesses.
Tone: Professional, authoritative, welcoming.
Capabilities: Maps-grounding for directions and venue discovery.
`;

const getAIClient = () => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey || apiKey === 'undefined') return null;
        return new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("AI Node Initialization Error:", e);
        return null;
    }
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<{ text: string, groundingChunks?: any[] }> => {
  try {
    const ai = getAIClient();
    if (!ai) return { text: "The AI Central Hub is currently in maintenance mode. Please verify your connection to the ISEYAA network." };

    const formattedHistory = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest', 
      contents: [...formattedHistory, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleMaps: {} }]
      }
    });

    return {
      text: response.text || "Synchronizing data...",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Signal weak. Re-routing through secondary Gateway node..." };
  }
};

export const fetchOgunLatestNews = async (): Promise<any[]> => {
  try {
    const ai = getAIClient();
    if (!ai) return [];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for recent news about Ogun State, Nigeria. Focus on government updates, economy, sports, and culture.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return chunks
      .filter(chunk => chunk.web)
      .map((chunk) => ({
        title: chunk.web?.title || "Ogun State Update",
        summary: response.text?.slice(0, 150) + "..." || "Official signal ingested from state news node.",
        source: chunk.web?.title || "Verified Source",
        url: chunk.web?.uri || "https://ogunstate.gov.ng",
        imageUrl: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop`,
        category: "State Pulse"
      }));
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};

export const generateImageWithGemini = async (prompt: string): Promise<{ text: string, imageUrl: string }> => {
  try {
    const ai = getAIClient();
    if (!ai) return { text: "Visual synthesis unavailable.", imageUrl: "" };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `High-fidelity cinematic visual: ${prompt} with Ogun State heritage elements.` }] }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return { text: "Visual synthesized.", imageUrl: `data:image/png;base64,${part.inlineData.data}` };
      }
    }
    return { text: "Synthesis failed.", imageUrl: "" };
  } catch (error) {
    return { text: "Error in synthesis node.", imageUrl: "" };
  }
};