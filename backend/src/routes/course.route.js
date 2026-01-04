import express from "express";
import authUser from "../middleware/auth.middleware.js";

import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from "../controllers/course.controller.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();


// routes for course
courseRouter.post('/create',authUser,createCourse)
courseRouter.get('/getpublished',getPublishedCourses)
courseRouter.get('/getcreator',authUser,getCreatorCourses)
courseRouter.post('/editcourse/:courseId',authUser,
upload.single('thumbnail'),editCourse)

courseRouter.get('/getcourse/:courseId',authUser,getCourseById)
courseRouter.delete('/remove/:courseId',authUser,removeCourse)


// routes for lecture
 
courseRouter.post('/createlecture/:courseId',authUser,createLecture)

courseRouter.get('courselecture/:courseId',authUser, getCourseLecture)

courseRouter.post('/editlecture/:lectureId',authUser,upload.single('videoUrl'),editLecture)

courseRouter.delete('/removelecture/:lectureId',authUser,removeLecture)





export default courseRouter;
