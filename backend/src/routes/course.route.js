import express from "express";
import authUser from "../middleware/auth.middleware.js";

import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from "../controllers/course.controller.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();



courseRouter.post('/create',authUser,createCourse)

courseRouter.get('/getpublished',getPublishedCourses)

courseRouter.get('/getcreator',authUser,getCreatorCourses)

courseRouter.post('/editcourse/:courseId',authUser,
upload.single('thumbnail'),editCourse)

courseRouter.get('/getcourse/:courseId',authUser,getCourseById)

courseRouter.delete('/remove/:courseId',authUser,removeCourse)



