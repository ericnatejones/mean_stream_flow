Stream = require('../models/streamSchema')
mongoose = require('mongoose')


var populateStream = function(stream){
  var newStream = new Stream(stream);
  newStream.save(function(err, savedStream) {
    if (err) {
      console.log(err)
    } else {
      console.log('stream saved: ')
      console.log(savedStream)
    }
  })
}

var streamArray = [
  {
    "streamName": "nf",
    "siteId": 99999
  }
]

module.exports = {
  populateStream:populateStream,
  streamArray:streamArray
}
