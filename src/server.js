var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var streamRouter = require('./routes/streamRoute');
var userRouter = require('./routes/userRoute');
var populateStream = require('./scripts/populate_streams')
var Stream = require('./models/streamSchema')

var app = express();

mongoose.connect('mongodb://localhost/stream-flow', function(){
  console.log("Connected to the database!");
});

app.post("/reset", function(req, res){
    Stream.remove().exec()
    populateStream.populateStream(populateStream.streamArray[0])
    res.send(populateStream.streamArray[0])
})

app.use(bodyParser.json());

app.use("/streams", streamRouter);
app.use("/users", userRouter);



app.listen(8000, function() {
  console.log("Your server is running on port 8000")
});
