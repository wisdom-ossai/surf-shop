const Post = require('../models/post.model')
module.exports = {
    getPosts: async (req, res, next) => {
        let posts = await Post.find({})
        res.render('posts', { posts });
    },
    
    getNewPost: async (req, res, next) => {
        res.render('posts/new')
    },

    createPost: async (req, res, next) => {
        let post = await Post.create(req.body);
        await res.redirect(`posts/${post._id}`);
    },

    showNewPost: async (req, res, next) => {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });

    }
}