import Course from "../models/course.model.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


export const searchWithAi = async (req, res) => {
  try {
    const {input} = req.body
    if(!input) return res.status(400).json({message: "Input is required"})


     const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
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

  const keyword = response.text
  










       const course = await Course.find({
        isPublished:true,
        $or:[
            {title:{$regex:input,$options:'i'}},
            
            {subTitle:{$regex:input,$options:'i'}},
            {description:{$regex:input,$options:'i'}},
            {category:{$regex:input,$options:'i'}},
            {level:{$regex:input,$options:'i'}}

        ]});
        if(!course) return res.status(404).json({message: "Course not found"})


          if(course.length > 0)  return res.status(200).json({message: "Course found",course})
         
       else{
        const course = await Course.find({
        isPublished:true,
        $or:[
            {title:{$regex:keyword,$options:'i'}},
            
            {subTitle:{$regex:keyword,$options:'i'}},
            {description:{$regex:keyword,$options:'i'}},
            {category:{$regex:keyword,$options:'i'}},
            {level:{$regex:keyword,$options:'i'}}

        ]});

        return res.status(200).json({message: "Course found",course})



       }



  } catch (error) {
    return res.status(500).json({message: "Failed to search with AI", error: error.message})   
    
  }






}