var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;


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
      lowerParameter: Number,
      upperParameter: Number
    }
  ],
  password: {
        type: String,
        required: true,
        min: 8
    }
});

UserSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 11, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model("User", UserSchema);
