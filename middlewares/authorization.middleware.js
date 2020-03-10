const Review = require('../models/review.model');
module.exports = {
    isReviewAuthor: async (req, res, next) => {
        const review = Review.findById(req.params.review_id);
        if (review.author == req.user._id) {
            return next();
        }
        req.session.error = 'Sorry you cannot perform any action on this review since you are neither an admin nor an author';
        return res.redirect('/')
    }
}