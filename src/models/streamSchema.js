var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var streamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  siteId: Number
});


module.exports = mongoose.model("Stream", streamSchema);
