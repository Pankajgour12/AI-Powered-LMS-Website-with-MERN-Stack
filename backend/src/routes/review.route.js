import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import authUser from "../middleware/auth.middleware.js";






const reviewRouter = express.Router();


reviewRouter.post('/createreview',authUser,createReview)
reviewRouter.get('/getreviews',getReviews)





export default reviewRouter;







