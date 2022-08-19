
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema( {
   name: {
       type: String,
       requires: true
   },
    email: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        requires: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function (next) {  // just before we save, run an async function. Defines a pre hook.
    try {
        if (this.isModified("password")) {     // if the password is changed
            let salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password,salt);
        }
        if (this.isModified("avatar")) {     // if the avatar is changed
            this.avatar = gravatar.url(this.email, {
                s:"200",        // Size
                r: "pg",        // Rating
                d: "mm"         // Default
            });
        }
        return next();
    }
    catch(err) {
        return next(err);                       // any helpers with an error (ex: next(err) will go to errorHandler
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch(err) {
        return next(err);
    }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;