console.log("1")
User = require('../models/userSchema')
mongoose = require('mongoose')



populateUser = function(user){
  var newUser = new User(user);
  newUser.save(function(err, savedUser) {
    if (err) {
      console.log(err)
    } else {
      console.log('user save: ')
      console.log(savedUser)
    }
  })
}

userArray = [
  {
    "userName": "ericnatejones",
    "favoritedStreams":[
      {
        "stream": 13246000,
        "upperParameter": 1200,
        "lowerParameter": 6000
      },
      {
        "stream": 13022500,
        "upperParameter": 7500,
        "lowerParameter": 13000
      },
      {
        "stream": 10149000,
        "upperParameter": 70,
        "lowerParameter": 1000
      }
    ]
  }
]

populateUser(userArray[0])
