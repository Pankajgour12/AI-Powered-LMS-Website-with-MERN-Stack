import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getCourseFromAI = async (input) => {
  const prompt = `You are an intelligent assistnat for an LearnFlow LMS platform.
a user will type any query about what they whant to leatn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course catefories and levels:




- Web Development
- UI / UX Design
- App Development
- Ethical Hacking
- AI/ML
- Data Science
- Other
- Beginner
- Intermediate
- Advanced

Only reply with one single keyword from the list above that best matches the query .Do not explain anything. No extra text.



Query: ${input}


`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text =
  response.text ||
  response.candidates?.[0]?.content?.parts?.[0]?.text ||
  "Other";

return text.trim();

 
};
