const cloudinary = require('cloudinary');
const Post = require('../models/post.model');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_PUBLIC_TOKEN });

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

        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.location,
                limit: 1
            })
            .send()
        req.body.coordinates = response.body.features[0].geometry.coordinates;
        let post = await Post.create(req.body);
        if (post) {
            req.session.success =
              'Well done! You successfully created a post';
            await res.redirect(`posts/${post._id}`);
        } else {
            req.session.success = 'Failed to create post. Please check your inputs and try again';
        }
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

        if (req.body.post && post) {
            if (req.body.post.location !== post.location) {

                let response = await geocodingClient
                    .forwardGeocode({
                        query: req.body.post.location,
                        limit: 1
                    })
                    .send()
                post.coordinates = response.body.features[0].geometry.coordinates;
                post.location = req.body.post.location;
            }

            req.body.post.title !== post.title ? post.title = req.body.post.title : null;
            req.body.post.description !== post.description ? post.description = req.body.post.description : null;
            req.body.post.price !== post.price ? post.price = req.body.post.price : null;

            post.save();
            req.session.success = `Well done! You successfully updated ${post.title}`;
            await res.redirect(`posts/${post._id}`);
            await res.redirect(`/posts/${post._id}`);
        } else {
            req.session.error = `Well done! You successfully updated ${post.title}`;
        }

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