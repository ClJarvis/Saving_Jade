var UserController = require('../userController');
var express = require('express');
var router = express.Router();
var jadeList = [];

// Include the model for a jade auction item that we set up in Mongoose
var Jade = require('../models/jade');

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
var sendJadeList = function (req, res, next) {


 var theUser = UserController.getCurrentUser();
 console.log(theUser.Username);


  Jade.find({}, function (err, tasks) {

    // swap out the user.-id for user.username in  each task

    //loop over task array and put in the username
    // instead of the _id for each task
 for (var i = 0; i <tasks.length;  i++) {
    tasks[i].user = theUser.username;

};



    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get task list");
    } else {
      res.render("jadeList", {
        title: "List of tasks",
        message: "Things you still need to do",
        tasks: tasks,
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

  sendJadeList(req, res, next);
});

// Handle a GET request from the client to /todo/:id
router.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  Jade.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a task with that id");

    // Find was successful
    } else {
      res.render('jade', {
        title : 'Express Todo Example',
        jade: thisItem
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
  res.render('jade', {
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
  Jade.find({ _id: req.body.jade_id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the task");

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
    Jade.findOne({ _id: req.body.db_id }, function (err, foundJade) {

      if (err) {
        sendError(req, res, err, "Could not find that task");
      } else {
        // Found it. Now update the values based on the form POST data.
        foundTodo.title = req.body.title;
        foundTodo.description = req.body.description;
        foundTodo.priority = req.body.priority;
        foundTodo.due_date = req.body.due_date;
        foundTodo.complete = (req.body.complete) ? req.body.complete : false;

        // Save the updated item.
        foundJade.save(function (err, newOne) {
          if (err) {
            sendError(req, res, err, "Could not save task with updated information");
          } else {
            res.redirect('/jade/list');
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


    var myjade = new Jade(theFormPostData);

    myjade.save(function (err, jade) {
      if (err) {
        sendError(req, res, err, "Failed to save task");
      } else {
        res.redirect('/jade/list');
      }
    });
  }
});

module.exports = router;