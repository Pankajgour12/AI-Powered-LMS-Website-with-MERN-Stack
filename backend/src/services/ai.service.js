import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY


});

const prompt =`You are an intelligent assistnat for an LearnFlow LMS platform.
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

If the query is not related to the list above, reply with "Other"

Query: ${input}


`


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt ,
  
  })
