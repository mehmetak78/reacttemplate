
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");

const validateUserRegister = require("../validations/validateUser/validateUserRegister");
const validateUserLogin = require("../validations/validateUser/validateUserLogin");

const helperError = require("../../helpers/helperError");

exports.register = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validateUserRegister.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }

        let user = await User.findOne({email:req.body.email});
        if (user) {
            console.log("user:", user);
            return helperError.sendError(400,"Email Already Exists",next);
        }
        else {
            const newUser = {...req.body, avatar:""};
            let savedUser = await User.create(newUser);
            return  res.status(200).json(savedUser);
        }
    }
    catch(err) {
        err.message = "Error in Registering the User.: ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.login = async function(req, res, next) {
    try {
        // Validation Check
        const { errors, isValid} = validateUserLogin.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let {id, name, avatar, email} = user;
            let isMatch = await user.comparePassword(req.body.password);

            if (isMatch) {
                let token = jwt.sign({                                  // Create a token
                    id,
                    name,
                    avatar
                }, keys.SECRET_OR_KEY, {expiresIn: 3600});
                return res.status(200).json({
                    success: true,
                    id,
                    name,
                    email,
                    token: "Bearer " + token
                })
            }
            else {
                return helperError.sendError(400,"Invalid Email/Password",next);
             }
        }
        else {
            return helperError.sendError(400,"Invalid Email/Password",next);
        }
    }
    catch(err) {
        err.message = "Error in User Login : ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};