import { GoogleGenAI } from "@google/genai";
import type { Handler } from "@netlify/functions";

// This function securely gets the client using the API_KEY from Netlify's environment variables.
const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // If the key is missing in Netlify settings, throw an error that will be shown in the app.
    throw new Error("API Key not configured by the site administrator.");
  }
  return new GoogleGenAI({ apiKey });
};

// This is the main handler for our serverless function.
const handler: Handler = async (event) => {
  // Only allow POST requests.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Get the topic from the request sent by the app.
    const { topic } = JSON.parse(event.body || "{}");

    if (!topic) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Topic is required" }),
      };
    }

    // This is the prompt for our patient education assistant.
    const prompt = `
    You are a patient education assistant for a specialized foot and ankle surgical clinic. Your role is to provide clear, simple, and reassuring information to patients about their conditions and treatments.

    Generate a response for the topic: "${topic}".

    Your audience is a patient who may be anxious and has no medical background. Use simple, everyday language. AVOID complex medical jargon. Keep sentences and paragraphs short.

    Base your entire response on information found on the website Footcaremd.org. Use the search tool to find the most relevant article on that site.

    Structure your response using the following markdown sections where applicable:
    - ### What is it? (A simple, one or two-sentence explanation)
    - ### Common Symptoms (Use a bulleted list)
    - ### How is it diagnosed? (Briefly explain the process)
    - ### Treatment Options (Describe non-surgical and surgical options simply)
    - ### What to Expect (If it's a procedure or recovery topic, explain the process or timeline)

    Finally, conclude your entire response with the following exact disclaimer, on its own line:
    "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment."
  `;

    // Securely initialize the client and make the API call.
    const client = getClient();
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
    });
    
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Send the generated content back to the app in a JSON response.
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        content: text,
        sources: groundingChunks,
      }),
      headers: { 'Content-Type': 'application/json' },
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorMessage = error instanceof Error ? error.message : "An internal server error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error: ${errorMessage}` }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler };