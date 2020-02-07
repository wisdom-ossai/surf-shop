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
        const post = await Post.findById(req.params.id);
        if (req.body.imagesDelete && req.body.imagesDelete.length) {
            let imagesDelete = req.body.imagesDelete;
            for (const imagePublicId of imagesDelete) {
                await cloudinary.v2.uploader.destroy(imagePublicId);
                for (const image of post.images) {
                    if (image.public_id === imagePublicId) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        if (req.files) {
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                })
            }
        }

        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;

        post.save();
        await res.redirect(`/posts/${post._id}`);

    },

    getEditPage: async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        res.render('posts/edit', { post })
    },

    deletePost: async (req, res, next) => {
        let post = await Post.findById(req.params.id);
        for (const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await post.remove();
        res.redirect('/posts')
    }
}