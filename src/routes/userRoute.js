var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userSchema');

var userRoute = express.Router();

userRoute.route("/")
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(users);
      }
    })

  })
  .post(function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, savedUser) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(savedUser);
      }
    })
  });

userRoute.route("/:id")
  .delete(function(req, res){
  var userID = req.params.id;
  User.findOneAndRemove({_id:userID}, function(err, deletedUser){
    if(err){
      res.status(500).send(err);
    }else{
      res.send(deletedUser);
    }
  })
})

module.exports = userRoute;
