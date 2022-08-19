const express = require("express");
const router = express.Router();

const routeHandlerUser = require("../handlers/routeHandlerUser");
const {loginRequired} = require("../../middlewares/middlewareAuth");

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post("/register", routeHandlerUser.register);

// @route   POST api/users/signin
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", routeHandlerUser.login);


// FOLLOWING ROUTES ARE FOR SOME TESTING PURPOSOSES

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test",(req,res) => res.json({msg: "Users Works"}));


// @route   GET api/users/privatecustom
// @desc    Return the current user
// @access  Private
router.get("/privatecustom", loginRequired, (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;