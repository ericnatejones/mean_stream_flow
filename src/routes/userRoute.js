var express = require("express");
var userRouter = express.Router();
var User = require("../models/userSchema");
var jwt = require("jsonwebtoken");
var config = require("../config");

userRouter.post("/login", function(req, res) {
    User.findOne({userName: req.body.userName}, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(404).send({message: "That user name doesn't exist in our system", success: false});
        } else if (user) {
            user.checkPassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    res.status(401).send({message: "Incorrect password", success: false})
                } else {
                    var token = jwt.sign(user.toObject(), config.secret);
                    res.send({token: token, user: user.withoutPassword(), message: "Access granted!", success: true});
                }
            });
        }
    })
});

userRouter.post("/signup", function(req, res) {
    User.find({userName: req.body.userName}, function(err, existingUser) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (existingUser.length) {
                res.status(400).send({message: "That user name already exists in our system. Try signing in.", success: false});
            } else {
                var newUser = new User(req.body);

                newUser.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send({message: "Successfully created a new user", success: true, user: newUser});
                    }
                });
            }
        }
    })

});

module.exports = userRouter;
