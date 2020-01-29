const express = require('express');
const router = express.Router({mergeParams: true});

/* GET Reviews index */
router.get('/', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Reviews' });
});

/* Post Reviews index */
router.post('/', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Reviews' });
});

/* Get Post Edit */
router.get('/:review_id/edit ', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Reviews' });
});

/* Update */
router.put('/:review_id ', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Reviews' });
});

/* Delete */
router.delete('/:review_id', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Reviews' });
});

module.exports = router;
