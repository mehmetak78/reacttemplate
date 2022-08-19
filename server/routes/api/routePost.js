const express = require("express");
const router = express.Router();

const routeHandlerPost = require("../handlers/routeHandlerPost");
const {loginRequired} = require("../../middlewares/middlewareAuth");

// @route   POST api/post
// @desc    Create post
// @access  Private
router.post("/",loginRequired,routeHandlerPost.createPost);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/",routeHandlerPost.getPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id",routeHandlerPost.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete("/:id",loginRequired, routeHandlerPost.deletePostById);

// @route   POST api/posts/like/:postId
// @desc    Like post by id
// @access  Private
router.post("/like/:postId",loginRequired, routeHandlerPost.likePostByPostId);

// @route   POST api/posts/unlike/:postId
// @desc    Unike post by id
// @access  Private
router.post("/unlike/:postId",loginRequired, routeHandlerPost.unLikePostByPostId);

// @route   POST api/posts/comment/:postId
// @desc    Add comment to a post by id
// @access  Private
router.post("/comment/:postId",loginRequired, routeHandlerPost.addComment);

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    Delete comment from the post by id
// @access  Private
router.delete("/comment/:postId/:commentId",loginRequired, routeHandlerPost.deleteComment);


// FOLLOWING ROUTES ARE FOR SOME TESTING PURPOSOSES

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test",(req,res) => res.json({msg: "Posts Works"}));

module.exports = router;

