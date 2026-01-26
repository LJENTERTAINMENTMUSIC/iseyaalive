import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the ISEYAA AI Agent, the digital brain of Ogun State's platform.
Your role: Assistant for citizens, tourists, and businesses.
Tone: Professional, authoritative, welcoming.
Capabilities: Maps-grounding for directions and venue discovery.
`;

// Fix: Access API key directly from process.env.API_KEY as per GenAI coding guidelines.
// This resolves the issue where 'process' was being accessed through the 'window' object incorrectly.
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

    // Standardize history for the API
    const formattedHistory = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));

    // Fix: Using gemini-flash-lite-latest (2.5 series) for Maps grounding support.
    // Coding guidelines state that Maps grounding is only supported in Gemini 2.5 series models.
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

    // Fix: Adhering to search grounding rules. Removed responseMimeType: "application/json"
    // and responseSchema because the guidelines state that output might not be JSON when grounding is used.
    // Search results with citations often break strict JSON formatting.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for recent news about Ogun State, Nigeria. Focus on government updates, economy, sports, and culture.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Fix: Extracting source URLs directly from groundingChunks metadata as required by the coding guidelines.
    // This ensures we have verifiable source links for the news items displayed in the UI.
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

    // Fix: Iterating through candidate parts to find the image part (inlineData).
    // Nano banana series models (like gemini-2.5-flash-image) can return multiple parts including text.
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