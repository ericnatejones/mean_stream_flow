var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log("2")

var UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  favoritedStreams:[
    {
      stream: {
        type: Schema.Types.ObjectId,
        ref: "Stream"
      },
      upperParameter: Number,
      lowerParameter: Number
    }
  ]
});

console.log("3")

module.exports = mongoose.model("User", UserSchema);
