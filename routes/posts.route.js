const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { getPosts, getNewPost, createPost, showNewPost } = require('../controllers/post.controller')

/* GET Posts index */
router.get('/', asyncHandler(getPosts));

/* GET posts new */
router.get('/new', asyncHandler(getNewPost));

/* Post posts index */
router.post('/', asyncHandler(createPost));

/* Get Post show */
router.get('/:id', asyncHandler(showNewPost));

/* Get Post Edit */
router.get('/:id/edit ', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});

/* Update */
router.put('/:id ', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});

/* Delete */
router.delete('/:id', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});
 

module.exports = router;
