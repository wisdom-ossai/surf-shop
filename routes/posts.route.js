const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const uploads = multer({
    'dest': 'uploads/'})

const { getPosts, getNewPost, createPost, showNewPost, editPost, getEditPage, deletePost } = require('../controllers/post.controller')

/* GET Posts index */
router.get('/', asyncHandler(getPosts));

/* GET posts new */
router.get('/new', asyncHandler(getNewPost));

/* Post posts index */
router.post('/', uploads.array('images', 4), asyncHandler(createPost));

/* Get Post show */
router.get('/:id', asyncHandler(showNewPost));

/* Get Post Edit */
router.get('/:id/edit', asyncHandler(getEditPage));

/* Update */
router.put('/:id', asyncHandler(editPost));

/* Delete */
router.delete('/:id', asyncHandler(deletePost));
 

module.exports = router;
