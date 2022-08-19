const express = require("express");

const routeHandlerProfile = require("../handlers/routeHandlerProfile");
const {loginRequired} = require("../../middlewares/middlewareAuth");


const router = express.Router();


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get("/",loginRequired,routeHandlerProfile.getCurrentUserProfile);

// @route   POST api/profile
// @desc    Create current users profile
// @access  Private
router.post("/",loginRequired,routeHandlerProfile.createCurrentUserProfile);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle",routeHandlerProfile.getProfileByHandle);

// @route   GET api/profile/user/:userId
// @desc    Get profile by userId
// @access  Public
router.get("/user/:userId",routeHandlerProfile.getProfileByUserId);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all",routeHandlerProfile.getAllProfiles);

// @route   POST api/profile/addExperience
// @desc    Add experience to profile
// @access  Private
router.post("/addExperience",loginRequired, routeHandlerProfile.addExperience);

// @route   POST api/profile/addEducation
// @desc    Add education to profile
// @access  Private
router.post("/addEducation",loginRequired, routeHandlerProfile.addEducation);

// @route   DELETE api/profile/deleteExperience/:experienceId
// @desc    Delete Experience from profile
// @access  Private
router.delete("/deleteExperience/:experienceId",loginRequired, routeHandlerProfile.deleteExperience);

// @route   DELETE api/profile/deleteEducation/:educationId
// @desc    Delete Education from profile
// @access  Private
router.delete("/deleteEducation/:educationId",loginRequired, routeHandlerProfile.deleteEducation);

// @route   DELETE /
// @desc    Delete User And Profile
// @access  Private
router.delete("/",loginRequired, routeHandlerProfile.deleteProfile);


// FOLLOWING ROUTES ARE FOR SOME TESTING PURPOSOSES

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test",(req,res) => res.json({msg: "Profile Works"}));

module.exports = router;