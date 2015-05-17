var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saving Multiplied III' });
});

/* GET auction page. */
router.get('/auction', function(req, res, next) {
  res.render('auction', { title: 'auction page' });
});

/* GET Register. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register page' });
});

/* GET Profile. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Your Profile' });
});


/* GET List items page. */
router.get('/listItems', function(req, res, next) {
  res.render('listItems', { title: 'List your auction Items' });
});

/* GET Edit items page.
router.get('/editItems', function(req, res, next) {
  res.render('editItems', { title: 'Edit your auction Items' });
}); */

module.exports = router;
