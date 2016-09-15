var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var streamRouter = require('./routes/streamRoute');
var userRouter = require('./routes/userRoute');
var populateStream = require('./scripts/populate_streams')
var Stream = require('./models/streamSchema')
var config = require("./config");
var expressJwt = require("express-jwt");

var app = express();

mongoose.connect(config.database, function(){
  console.log("Connected to the database!");
});

app.use(bodyParser.json());

app.use("/streams", streamRouter);
app.use("/users", userRouter);

app.use(express.static("../public"));


app.listen(8000, function() {
  console.log("Your server is running on port 8000")
});

//// tests

app.post("/reset", function(req, res){
    Stream.remove().exec()
    populateStream.populateStream(populateStream.streamArray[0])
    res.send(populateStream.streamArray[0])
})
