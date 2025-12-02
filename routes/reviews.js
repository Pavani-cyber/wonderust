const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing");
const Review=require("../models/review.js");
const {validateReview , isLoggedIn , isReviewOwner}=require("../middleware.js");

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const reviewController=require("../controllers/reviews.js");

//reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(reviewController.destroyReview));

module.exports=router;