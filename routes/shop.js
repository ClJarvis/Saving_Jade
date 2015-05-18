var UserController = require('../userController');
var express = require('express');
var router = express.Router();
var shopList = [];

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

    // swap out the user.-id for user.username in each item

    //loop over item array and put in the username
    // instead of the _id for each item
 for (var i = 0; i <items.length;  i++) {
    items[i].user = theUser.username;

};



    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get item list");
    } else {
      res.render("shopList", {
        title: "List of items",
        message: "Things you still need to do",
        items: items,
        user: theUser.username
      });
    }
  });
};

// Handle a GET request from the client to /todo/list
router.get('/list', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  sendShopList(req, res, next);
});

// Handle a GET request from the client to /todo/:id
router.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  Shop.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a item with that id");

    // Find was successful
    } else {
      res.render('listItems', {
        title : 'Express Todo Example',
        shop: thisItem
      });
    }
  });
});

// Handle a GET request from the client to /todo
router.get('/', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  // Send the todo form back to the client
  res.render('shop', {
    title : 'Express Todo Example',
    todo: {
      title: '',
      description: '',
      priority: 1,
      due_date: new Date(),
      complete: false
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
router.post('/', function (req, res, next) {

  // User is editing an existing item
  if (req.body.db_id !== "") {

    // Find it
    Shop.findOne({ _id: req.body.db_id }, function (err, foundShop) {

      if (err) {
        sendError(req, res, err, "Could not find that item");
      } else {
        // Found it. Now update the values based on the form POST data.
        foundTodo.title = req.body.title;
        foundTodo.description = req.body.description;
        foundTodo.priority = req.body.priority;
        foundTodo.due_date = req.body.due_date;
        foundTodo.complete = (req.body.complete) ? req.body.complete : false;

        // Save the updated item.
        foundShop.save(function (err, newOne) {
          if (err) {
            sendError(req, res, err, "Could not save item with updated information");
          } else {
            res.redirect('/shop/list');
          }
        });
      }
    });

  // User created a new item
  } else {

    // Who is the user?
    var theUser = UserController.getCurrentUser();

    // What did the user enter in the form?
    var theFormPostData = req.body
    theFormPostData.user = theUser._id;

    console.log('theFormPostData',theFormPostData);


    var myshop = new Shop(theFormPostData);

    myshop.save(function (err, shop) {
      if (err) {
        sendError(req, res, err, "Failed to save item");
      } else {
        res.redirect('/shop/list');
      }
    });
  }
});

module.exports = router;
