var express = require('express');
var router = express.Router();
var UserController = require('../userController');
var shopList = []; ///////////////shopList or shopItems same on entire page

// Include the model for a shop auction item that we set up in Mongoose
var Shop = require('../models/shop');

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

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
      res.render("listItems", {
        title: ' ',
        price: ' ',
        image: ' ',
        endDate: ' ',
        items: items,
        user: theUser.username
      });
    }
  });
};

// Handle a GET request from the client to /shop/list
router.get('/list', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  sendShopList(req, res, next);
});


// Handle a GET request from the client to /todo
router.get('/listItems', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/users/login");
  }
  console.log("this is the GET for the listItems page")

  // Send the todo form back to the client
  res.render('listItems', {
     shop: {
      title: ' ',
      image: ' ',
      price: ' ',
      endDate: ' ',
      seller: '',
      _id: ''
    }
  });
});


// Handle a GET request from the client to /todo/:id
router.get('/listItems/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/users/login");
  }

  Shop.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a item with that id");

    // Find was successful
    } else {
      res.render('listItems', { //listItems
        title : 'Auction Items',
        shop: thisItem
      });
    }
  });
});

// Handle a DELETE request from the client to /todo
router.delete('/', function (req, res) {
  Shop.find({ _id: req.body.shop_id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the item");

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });
});

// Handle a POST request from the client to /todo
router.post('/listItems', function (req, res, next) { //removed listItems to see if that fixes edit

  // User is editing an existing item
  if (req.body.edit_item_id !=='' ) {
console.log("i'm trying to edit", req.body);

    // Find it
    Shop.findOne({ _id: req.body.edit_item_id }, function (err, foundlistitems) {

      if (err) {
        sendError(req, res, err, "Could not find that item");
      } else {
        // Found it. Now update the values based on the form POST data.
        foundlistitems.title = req.body.title;
        foundlistitems.price = req.body.price;
        foundlistitems.image = req.body.image;
        foundlistitems.endDate = req.body.endDate;

        // Save the updated item.
        foundlistitems.save(function (err, newOne) {
          if (err) {
            sendError(req, res, err, "Could not save item with updated information");
          } else {
            res.redirect('/auction');
          }
        });
      }
    });

  // User created a new item
  } else {

    // Who is the user?
    var theUser = UserController.getCurrentUser();
    if (!theUser) {
      res.redirect('/users/login');
    }
    // What did the user enter in the form?
    var theFormPostData = req.body
    theFormPostData.user = theUser._id;

    console.log('theFormPostData',theFormPostData);


    var myshop = new Shop(theFormPostData);

    myshop.save(function (err, shop) {
      if (err) {
        sendError(req, res, err, "Failed to save item");
      } else {
        res.redirect('/auction');
      }
    });
  }
});

module.exports = router;
