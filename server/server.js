
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routeUser = require("./routes/api/routeUser");
const routeProfile = require("./routes/api/routeProfile");
const routePost = require("./routes/api/routePost");
const {errorHandler, errorLogger} = require("./helpers/helperError");
const keys = require("./config/keys");

const app = express();

// Body Parser helpers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB CONFIG & CONNECT
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(keys.MONGO_URI)
    .then(()=> {
        console.log(`Connected to MongoDB: ${keys.MONGO_URI}`);
    })
    .catch(err => console.log(err));

// Routes
app.use("/api/users", routeUser);
app.use("/api/profile", routeProfile);
app.use("/api/posts", routePost);

// errorLogger,errorHandler
app.use(errorLogger,errorHandler);   // any helpers with an error (ex: next(err) will go to errorHandler


// Listen port
const port = process.env.PORT || keys.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

