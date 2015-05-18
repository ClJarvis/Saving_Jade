var express = require('express');
var router = express.Router();

// Handle the registration form post
router.post("/create", function (req, res) {
  console.log("Hey I am the register POST handler")
});

// Handle the request for the registration form
router.get("/register", function (req, res) {
  console.log("getting the registration page")
  res.render("register");
});


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


module.exports = router;
