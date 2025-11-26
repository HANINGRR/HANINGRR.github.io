import { GoogleGenAI } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchTopicAnalysis = async (topicTitle: string): Promise<GeneratedContent> => {
  try {
    const prompt = `
      You are "ECHO", an advanced AI system from the year 2049.
      The user is viewing a historical archive about: "${topicTitle}".
      
      Generate a short, cryptic, but insightful commentary in Chinese (Simplified).
      
      Return a JSON object with:
      - "prediction": A 2-sentence prediction about how this specific topic evolved by the year 2049. (Dark, sci-fi tone).
      - "metaphor": A short, poetic 1-sentence metaphor describing this technology.

      Example tone: "By 2049, neural interfaces made screens obsolete. We no longer watch content; we dream it."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      prediction: "时间线数据损坏。无法预测该节点的未来演变。",
      metaphor: "数据如尘埃般消散。"
    };
  }
};