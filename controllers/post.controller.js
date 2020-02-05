const cloudinary = require('cloudinary');
const Post = require('../models/post.model');

cloudinary.config({
  cloud_name: 'chuksmedia',
  api_key: '443895348311813',
  api_secret: process.env.CLOUDINARY_SECRET
});
module.exports = {
    getPosts: async (req, res, next) => {
        let posts = await Post.find({})
        res.render('posts', { posts });
    },
    
    getNewPost: async (req, res, next) => {
        res.render('posts/new')
    },

    createPost: async (req, res, next) => {
        req.body.images = []
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.images.push({
                url: image.secure_url,
                public_id: image.public_id
            }); 
        }
        let post = await Post.create(req.body);
        await res.redirect(`posts/${post._id}`);
    },

    showNewPost: async (req, res, next) => {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });

    },

    editPost: async (req, res, next) => {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        await res.redirect(`/posts/${post._id}`);

    },

    getEditPage: async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        res.render('posts/edit', { post })
    },

    deletePost: async (req, res, next) => {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts')
    }
}