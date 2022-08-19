
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const helperError = require("../helpers/helperError");

// make sure the user is logged in - Authentication
// Do u also need to check it from DB ?? You can still continue working although you are being deleted from DB

exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, keys.SECRET_OR_KEY, function (err, decoded) {
            if(decoded) {
                req.user=decoded;
                return next();
            }
            else {
                return helperError.sendError(401,"Please log in first",next);
            }
        })
    }
    catch(err) {
        return helperError.sendError(401,"Please log in first",next);
    }
};


// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        jwt.verify(token, keys.SECRET_OR_KEY, function (err, decoded) {
            if(decoded && decoded.id === req.params.id) {
                return next();
            }
            else {
                return helperError.sendError(401,"Unauthorized",next);
            }
        })
    }
    catch(err) {
        return helperError.sendError(401,"Unauthorized",next);
    }
};