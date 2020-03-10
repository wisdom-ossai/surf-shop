const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { createReview, updateReview, deleteReview } = require('../controllers/review.controller')
const {isReviewAuthor} = require('../middlewares/authorization.middleware');

/* Post Reviews index */
router.post('/', asyncHandler(createReview));

/* Update */
router.put('/:review_id', isReviewAuthor, asyncHandler(updateReview));

/* Delete */
router.delete('/:review_id', asyncHandler(deleteReview));

module.exports = router;
