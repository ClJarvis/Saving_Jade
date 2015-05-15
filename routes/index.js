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

module.exports = router;
