var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flowRouter = require('./routes/flowRoute');

var app = express();

mongoose.connect('mongodb://localhost/stream-flow', function(){
  console.log("Connected to the database!");
});

app.use(bodyParser.json());

app.use("/api", flowRouter);

app.listen(8000, function() {
  console.log("Your server is running on port 8000")
});
