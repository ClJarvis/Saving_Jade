var Q = require("q");
var express = require('express');
var router = express.Router();
var UserController = require("../userController");
var UserModel = require("../models/user");
var Shop = require("../models/shop");
var app = express.Router();
var itemsList=[];
//change jade to shop, change tasks to items

// GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  console.log('Render the error template back to the client.');
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

// Retrieve all Items for the current user
var getUserItems = function (userId) {
  var deferred = Q.defer();

  console.log('Another promise to let the calling function know when the database lookup is complete');

  Shop.find({user: userId}, function (err, items) {
    if (!err) {
      console.log('Items found = ' + items.length);
      console.log('No errors when looking up items. Resolve the promise (even if none were found).');
      deferred.resolve(items);
    } else {
      console.log('There was an error looking up items. Reject the promise.');
      deferred.reject(err);
    }
  })

  return deferred.promise;
};


// Handle the registration form post
app.post("/create", function (req, res) {
  console.log("Hey I am the register POST handler")
  res.render("profile");
});

// Handle the request for the registration form
app.get("/register", function (req, res) {
  console.log("getting the registration page")
  res.render("register");
});

// Handle the login action
app.post("/login", function (req, res) {

  console.log('Hi, this is Node handling the /user/login route');

  // Attempt to log the user in with provided credentials
  UserController.login(req.body.username, req.body.password)

    // After the database call is complete and successful,
    // the promise returns the user object
    .then(function (validUser) {

      console.log('Ok, now we are back in the route handling code and have found a user');
      console.log('validUser',validUser);
      console.log('Find any items that are assigned to the user');

      // Now find the items that belong to the user
      getUserItems(validUser._id)
        .then(function (items) {
          // Render the auction items
          res.redirect("/shop/listItems"); //changed to items
        })
        .fail(function (err) {
          sendError(req, res, {errors: err.message}, "Failed")
        });
    })

    // After the database call is complete but failed
    .fail(function (err) {
      console.log('Failed looking up the user');
      sendError(req, res, {errors: err.message}, "Failed")
    })
});

app.get("/profile", function (req, res) {
  var user = UserController.getCurrentUser();

  if (user !== null) {
    getUserItems(user._id).then(function (items) {
      res.render("userProfile", {
        username: user.username,
        items: items
      });
    });
  } else {
    res.redirect("/");
  }

});
///logout
app.get("/logout", function (req, res) {
UserController.logout();
res.redirect("/");
});


module.exports = app;
