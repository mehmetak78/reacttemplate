
const helperError = require("../../helpers/helperError");
const validatePost = require("../validations/validatePost/validatePost");
const validateComment = require("../validations/validatePost/validateComment");

const Post = require("../../models/Post");

exports.createPost = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validatePost.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }

        // Save Post
        let postFields = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        };
        let newPost = await Post.create(postFields);
        if (newPost) {
            return res.status(200).json(newPost);        // CREATE SUCCESS
        }
        else {
            helperError.sendError(400, "Error in Creating The Post",next);
        }
    }
    catch(err) {
        err.message = "Error in Creating The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};


exports.getPosts = async function (req, res, next) {
    try {
        // Get All Posts
        let posts = await Post.find()
            .sort({date: -1});
        if (posts && posts.length !== 0) {
            return res.json(posts);
        }
        else {
            return helperError.sendError(404,"There are no posts",next);
        }
    }
    catch(err) {
        err.message = "There are no posts " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.getPostById = async function (req, res, next) {
    try {
        // Get Post by Id
        let post = await Post.findById(req.params.id);
        if (post) {
            return res.json(post);
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "There is no post with this id " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.deletePostById = async function (req, res, next) {
    try {
        // Get Post by Id
        let post = await Post.findById(req.params.id);
        if (post) {
            if (post.user.toString() === req.user.id) {
                let deletedPost = await post.remove();
                if (deletedPost) {
                    return res.json(deletedPost);
                }
                else {
                    return helperError.sendError(404,"Error in Deleting The Post",next);
                }
            }
            else {
                return helperError.sendError(401,"You are not owner of this post",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "Error in Deleting The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.likePostByPostId = async function (req, res, next) {
    try {
        // Get Post by Id
        let post = await Post.findById(req.params.postId);
        if (post) {
            let likesOfUser = post.likes.filter(like => (
                like.user.toString() === req.user.id
            ));
            if (likesOfUser.length === 0) {
                let newLike = {user: req.user.id};
                post.likes.unshift(newLike);
                let updatedPost = await post.save();
                if (updatedPost) {
                    return res.json(updatedPost);
                }
                else {
                    return helperError.sendError(404,"Error in Like The Post",next);
                }
            }
            else {
                return helperError.sendError(400,"You have already liked the post",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "Error in Like The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};


exports.unLikePostByPostId = async function (req, res, next) {
    try {
        // Get Post by Id
        let post = await Post.findById(req.params.postId);
        if (post) {
            const removeIndex = post.likes.map( like => (
                like.user.toString()
            )).indexOf(req.user.id);

            if (removeIndex >= 0) {
                // Splice out of index
                post.likes.splice(removeIndex, 1);
                let updatedPost = await post.save();
                if (updatedPost) {
                    return res.json(updatedPost);
                }
                else {
                    return helperError.sendError(404,"Error in UnLike The Post",next);
                }
            }
            else {
                return helperError.sendError(400,"You haven't liked the post yet",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "Error in Unlike The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};

exports.addComment = async function (req, res, next) {
    try {
        // Validation Check
        const {errors, isValid} = validateComment.validateInput(req.body);
        if (!isValid) {
            return helperError.sendError(400,errors,next);
        }
        // Get Post by Id
        let post = await Post.findById(req.params.postId);
        if (post) {
            let newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };
            post.comments.unshift(newComment);
            let updatedPost = await post.save();
            if (updatedPost) {
                return res.json(updatedPost);
            }
            else {
                return helperError.sendError(404,"Error in Adding Comment To The Post",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "Error in Adding Comment To The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};


exports.deleteComment = async function (req, res, next) {
    try {
        // Get Post by Id
        let post = await Post.findById(req.params.postId);
        if (post) {
            const removeIndex = post.comments.map( oomment => (
                oomment._id.toString()
            )).indexOf(req.params.commentId);
            if (removeIndex >= 0) {
                // Splice out of index
                post.comments.splice(removeIndex, 1);
                let updatedPost = await post.save();
                if (updatedPost) {
                    return res.json(updatedPost);
                }
                else {
                    return helperError.sendError(404,"Error in Deleting Comment From The Post",next);
                }
            }
            else {
                return helperError.sendError(400,"Comment not found to delete",next);
            }
        }
        else {
            return helperError.sendError(404,"There is no post with this id",next);
        }
    }
    catch(err) {
        err.message = "Error in Deleting Comment From The Post " + err.message;
        return helperError.sendError(400,err,next);
    }
};