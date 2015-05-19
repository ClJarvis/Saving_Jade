var express = require('express');
var router = express.Router();
var UserController = require('../userController');
var shopList = []; ///////////////shopList or shopItems same on entire page

// Include the model for a shop auction item that we set up in Mongoose
var Shop = require('../models/shop');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saving Multiplied III' });
});

/* GET auction page. */
router.get('/auction', function(req, res, next) {
  // res.render('auction', { title: 'auction page' });
  sendShopList(req, res, next);

});

/* GET Register.*/
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register page' });
});

/* GET Profile. */
router.get('/profile', function(req, res, next) {
  myShopList(req, res, next);

});

// Send the auction list back to the client
var sendShopList = function (req, res, next) {


 var theUser = UserController.getCurrentUser();
 console.log(theUser.Username);


  Shop.find({}, function (err, items) {
  console.log(items);
    // swap out the user.-id for user.username in each item

    //loop over item array and put in the username
    // instead of the _id for each item
 for (var i = 0; i <items.length; i++) {   ///shopList or items
    items[i].user = theUser.username;

};



    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get item list");
    } else {
      res.render("auction", {
        title: '',
        price: '',
        endDate: '',
        items: items,
        user: theUser.username
      });
    }
  });
};




 // GET Edit items page.
// router.get('/editItems', function(req, res, next) {
//   res.render('editItems', { title: 'Edit your auction Items' });
// });

// Send the auction list back to the client
var myShopList = function (req, res, next) {


 var theUser = UserController.getCurrentUser();
 console.log(theUser.Username);


  Shop.find({_id:theUser._id}, function (err, items) {
  console.log(items);
    // swap out the user.-id for user.username in each item

    //loop over item array and put in the username
    // instead of the _id for each item
 for (var i = 0; i <items.length; i++) {   ///shopList or items
    items[i].user = theUser.username;

};



    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get item list");
    } else {
      res.render("profile", {
        title: '',
        price: '',
        endDate: '',
        items: items,
        user: theUser.username
      });
    }
  });
};




 // GET Edit items page.
// router.get('/editItems', function(req, res, next) {
//   res.render('editItems', { title: 'Edit your auction Items' });
// });
module.exports = router;
