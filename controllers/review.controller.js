const Post = require('../models/post.model');
const Review = require('../models/review.model');

module.exports = {
    createReview: async (req, res, next) => {
        let post = await Post.findById(req.params.id);
        let initialPostLength = await post.reviews.length
        let review = await Review.create(req.body);
        post.reviews.push(review);
        let saved = await post.save();
        if (initialPostLength < saved.reviews.length) {
            req.session.success = 'Well done! You successfully created a review for this post';
            res.redirect(`/posts/${post._id}`);
        } else {
            req.session.error = 'Ouch! Review for this post could not be created. Something went wrong';
            res.redirect(`/posts/${post._id}`);
        }
    },

    updateReview: async (req, res, next) => {

    },

    deleteReview: async (req, res, next) => {

    }
}