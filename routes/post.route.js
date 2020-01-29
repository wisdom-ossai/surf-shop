const express = require('express');
const router = express.Router();

/* GET Posts index */
router.get('/', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});

/* GET posts new */
router.get('/new', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});

/* Post posts index */
router.post('/', (req, res, next) => {
  res.render('', { title: 'Surf Shop | Posts' });
});

/* Get Post show */
router.get('/:id', (req, res, next) => {
  res.render('/', { title: 'Surf Shop | Posts' });
});

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
