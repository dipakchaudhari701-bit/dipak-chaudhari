
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askGemini(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class materials scientist, injection molding expert, and polymer economist. Provide technical information about plastic materials, their mechanical properties, and specific injection molding parameters (Shrinkage, Melt/Mold temperatures, Draft angles, Moisture sensitivity). You should be able to troubleshoot molding defects (sink marks, warping, flashing) based on material characteristics. You are also an expert in Indian polymer market trends and pricing in INR/kg. Be concise, engineering-focused, and helpful.",
      }
    });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI. Please check your connection.";
  }
}

export async function getLiveMarketPrice(materialName: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for the current live market price of ${materialName} granules or raw material on IndiaMart.com and other Indian industrial B2B marketplaces. Provide the price range in INR per kg and mention any notable recent fluctuations or supplier notes regarding grade-specific pricing (injection molding vs extrusion grades).`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources };
  } catch (error) {
    console.error("Live Price Search Error:", error);
    return { text: "Failed to fetch live prices. Please try again later.", sources: [] };
  }
}

export async function identifyPlasticFromImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: "Analyze this image and identify what plastic material it might be. Discuss its likely mechanical properties and injection molding suitability (e.g., if it has high shrinkage or needs pre-drying) and mention its approximate market value in INR/kg in India.",
          },
        ],
      },
    });
    return response.text || "I couldn't identify the plastic in this image.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Error analyzing the image.";
  }
}
