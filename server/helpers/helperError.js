
/*
    any helpers with an error (ex: next(err) will go to errorHandler
    err will be an objet, and can be used either:
        1.  next( {
                status: 400,
                message: err.message + "ERRRRRRRRRRR"
            })
        2.
            var err = new Error(err.message);
            err.status = 400;
            return next(err);

    If you pass anything to the next() function (except the string 'route'),
    Express regards the current request as being an error and will skip any remaining non-error handling routing and helpers functions.
*/

// sendError will return next with an object which will call errorHandler, and errorLogger.
// Since we have
//      errorLogger,errorHandler
//      app.use(errorLogger,errorHandler)
exports.sendError = (status, errors, next) => {
    let error = {};
    if (errors) {
        error.status = status || 400;
        if (typeof (errors) === "string") {                       // Error is a string message
            error.errors = {errMsg: errors};                      // Make an object
        }
        else {                                                    // Error is already a custom made object
            error.errors = errors;
        }
    }
    else {
       error.status =  500;
       error.errors ={errMsg: "Unknown Error"};
    }

    return next(error);
};

exports.errorLogger = (error, req, res, next)  => {
    error = {handler: "errorLogger", ...error};
    console.log(error);
    next(error);
};

exports.errorHandler = (error,request,response,next)  => {
    error = {...error, handler:"errorHandler"};
    return response.status(error.status).json (error);
};


