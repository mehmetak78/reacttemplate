
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const helperError = require("../../helpers/helperError");
const validateProfile = require("../validations/validateProfile/validateProfile");
const validateExperience = require("../validations/validateProfile/validateExperience");
const validateEducation = require("../validations/validateProfile/validateEducation");

exports.getCurrentUserProfile = async function (req, res, next) {
    try {
        let profile = await Profile.findOne({user: req.user.id})
            .populate("user",["name","avatar"]);
        if (profile) {
            return res.json(profile);
        }
        else {
            return helperError.sendError(404,"There is no profile for this user",next);
        }
    }
    catch(err) {
        err.message = "Error in Getting The User Profile: ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.createCurrentUserProfile = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validateProfile.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        // Skills - Spilt into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }
        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            // Update
            let updatedProfile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set:profileFields},
                {new:true}
            );
            if (updatedProfile) {
                return res.status(200).json(updatedProfile);        // UPDATE SUCCESS
            }
            else {
                helperError.sendError(400, "Error in Updating The Profile",next);
            }
        }
        else {      // Create
            // Check if handle exists

            let handle = await Profile.findOne({handle: profileFields.handle});
            if (handle) {
                helperError.sendError(400, "Handle already exists",next);
            }
            else {
                // Save Profile
                let newProfile = await Profile.create(profileFields);
                if (newProfile) {
                    return res.status(200).json(newProfile);        // CREATE SUCCESS
                }
                else {
                    helperError.sendError(400, "Error in Creating The Profile",next);
                }
            }
        }
    }
    catch(err) {
        err.message = "Error in Creating The Profile: ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.getProfileByHandle = async function (req, res, next) {
    try {
        let profile = await Profile.findOne({handle: req.params.handle})
            .populate("user",["name","avatar"]);
        if (profile) {
            return res.json(profile);
        }
        else {
            return helperError.sendError(404,"There is no profile for this handle",next);
        }
    }
    catch(err) {
        err.message = "There is no profile for this handle: ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.getProfileByUserId = async function (req, res, next) {
    try {
        let profile = await Profile.findOne({user: req.params.userId})
            .populate("user",["name","avatar"]);
        if (profile) {
            return res.json(profile);
        }
        else {
            return helperError.sendError(404,"There is no profile for this userId",next);
        }
    }
    catch(err) {
        err.message = "There is no profile for this userId: ex:" + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.getAllProfiles = async function (req, res, next) {
    try {
        let profile = await Profile.find()
            .populate("user",["name","avatar"]);
        if (profile && profile.length !== 0) {
            return res.json(profile);
        }
        else {
            return helperError.sendError(404,"There are no profiles",next);
        }
    }
    catch(err) {
        err.message = "There are no profiles " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.addExperience = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validateExperience.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }
        let profile = await Profile.findOne({user: req.user.id});

        if (profile) {
            const experience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            // Add to experience array

            profile.experience.unshift(experience);             // adds from the beginning of the array
            let newProfile = await profile.save();
            if (newProfile) {
                return res.status(200).json(newProfile);        // SAVE SUCCESS
            }
            else {
                helperError.sendError(400, "Error in Saving The Experience",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no profile for this user",next);
        }
    }
    catch(err) {
        err.message = "Error in Saving The Experience " + err.message;
        return helperError.sendError(400,err,next);
    }
};


exports.addEducation = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validateEducation.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }
        let profile = await Profile.findOne({user: req.user.id});

        if (profile) {
            const education = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
                };
            // Add to experience array

            profile.education.unshift(education);
            let newProfile = await profile.save();
            if (newProfile) {
                return res.status(200).json(newProfile);        // SAVE SUCCESS
            }
            else {
                helperError.sendError(400, "Error in Saving The Education",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no profile for this user",next);
        }
    }
    catch(err) {
        err.message = "Error in Saving The Education " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.deleteExperience = async function (req, res, next) {
    try {

        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            // Get remove index
            const removeIndex = profile.experience.map(experience => experience.id)
                .indexOf(req.params.experienceId);

            // Splice out of array
            profile.experience.splice(removeIndex,1);

            let updatedProfile = await profile.save();
            if (updatedProfile) {
                return res.status(200).json(updatedProfile);        // DELETE SUCCESS
            }
            else {
                helperError.sendError(400, "Error in Deleting The Experience",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no profile for this user",next);
        }
    }
    catch(err) {
        err.message = "Error in Deleting The Experience " + err.message;
        return helperError.sendError(400,err,next);
    }
};


exports.deleteEducation = async function (req, res, next) {
    try {

        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            // Get remove index
            const removeIndex = profile.education.map(education => education.id)
                .indexOf(req.params.educationId);

            // Splice out of array
            profile.education.splice(removeIndex,1);

            let updatedProfile = await profile.save();
            if (updatedProfile) {
                return res.status(200).json(updatedProfile);        // DELETE SUCCESS
            }
            else {
                helperError.sendError(400, "Error in Deleting The Education",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no profile for this user",next);
        }
    }
    catch(err) {
        err.message = "Error in Deleting The Education " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.deleteProfile = async function (req, res, next) {
    try {

        let deletedProfile = await Profile.findOneAndRemove({user: req.user.id});
        if (deletedProfile) {
            let deletedUser = await User.findOneAndRemove({_id: req.user.id});
                if (deletedUser) {
                    return res.status(200).json(deletedUser);        // DELETE SUCCESS
                }
                else {
                    return helperError.sendError(404,"Cannot Find User To Delete",next);
                }
        }
        else {
            return helperError.sendError(404,"Cannot Find Profile To Delete",next);
        }
    }
    catch(err) {
        err.message = "Error in Deleting The Profile " + err.message;
        return helperError.sendError(400,err,next);
    }
};