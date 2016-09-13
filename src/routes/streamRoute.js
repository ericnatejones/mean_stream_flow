var express = require('express');
var mongoose = require('mongoose');
var Stream = require('../models/streamSchema');

var streamRoute = express.Router();

streamRoute.route("/")
  .get(function(req, res) {
    Stream.find(function(err, streams) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(streams);
      }
    })

  })
  .post(function(req, res) {
    var newStream = new Stream(req.body);
    newStream.save(function(err, savedStream) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(savedStream);
      }
    })
  });

streamRoute.route("/:id")
  .delete(function(req, res){
  var streamID = req.params.id;
  Stream.findOneAndRemove({_id:streamID}, function(err, deletedStream){
    if(err){
      res.status(500).send(err);
    }else{
      res.send(deletedStream);
    }
  })
})

module.exports = streamRoute;
