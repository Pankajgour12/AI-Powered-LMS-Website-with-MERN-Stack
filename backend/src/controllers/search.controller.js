import Course from "../models/course.model.js";
import { getCourseFromAI } from "../services/ai.service.js";

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    let course = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    if (course.length > 0) {
      return res.status(200).json({ message: "Course found", course });
    }

    const keyword = await getCourseFromAI(input);

    course = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subTitle: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { level: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json({ message: "Course found", course });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to search with AI",
      error: error.message,
    });
  }
};
