
import { GoogleGenAI } from "@google/genai";
import type { Topic } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchTopicInfo = async (topic: Topic): Promise<string> => {
  const prompt = `
    You are a helpful assistant for a foot and ankle surgeon's office. Your purpose is to provide clear, easy-to-understand educational material for patients.
    
    The topic is: "${topic}".

    Write for a general audience with no medical background. Avoid overly technical jargon. Use simple language.
    
    Structure your response with the following sections if they are applicable to the topic:
    - ### What is it? (A simple overview)
    - ### Common Symptoms
    - ### What Causes It?
    - ### Common Treatment Options (Briefly describe non-surgical and surgical options like physical therapy, orthotics, medication, lifestyle changes, and surgery, without recommending one over the other. Frame them as possibilities to discuss with a doctor.)
    - ### What Can I Do at Home? (Suggest general, safe, at-home care.)

    Format the response using markdown. Use "###" for section headings and "*" for bullet points in lists.
    
    IMPORTANT: Conclude your response with the following exact disclaimer, on its own line, at the very end:
    "This information is for educational purposes only and does not constitute medical advice. Please consult with your surgeon to discuss your specific condition and treatment plan."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to generate content from AI service.");
  }
};
