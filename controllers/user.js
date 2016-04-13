var User = require('../models/user');
var mongoose = require('mongoose');



// Post method for athletes
var createUserAccount = function(req, res){
  var user = req.body;
  User.create({
    username: user.username,
    password: user.password, //TODO: Create a hashing mechanism
    email: user.email,
    bio: {
      name: user.name
    },
    role: user.role
  }, function(err, user){
    err ? res.send(err) :
    res.send('User account creation successful!');
  });
};

// DELETE user by ID
// Takes in the user ID from URI params and deletes the user
var deleteUser = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    err ? res.send(err) :
    res.send({message: "User deleted", content: user});
  })
};
// Get user by ID
// Takes in URI params and returns a JSON object containing a single user
var getUser = function(req, res){
  User.findById(req.params.id, function(err, user){
    err ? res.send(err) :
    res.send(user);
  })
};

// GET all users
// Returns all users
var getAllUsers = function(req,res){
  User.find({}, function(err, users){
    err ? res.send(err) :
    res.send(users);
  })
};

//  PATCH request -- most updates
// For add, don't forget the 0th array index in the path
var patchUpdate = function(req,  res){
  var patches = req.body;
  var id = req.params.id;
  User.findById(id, function(err, user){
    if(err){ res.send(err);}
    user.patch(patches, function(err){
      if(err){ res.send(err);}
      user.save(function(err){
        if(err) {res.send(err);}
        else {res.send("Update(s) successful" + user);}
      });
    });
  });
};


module.exports = {
  patchUpdate: patchUpdate,
  createUserAccount: createUserAccount,
  getUser: getUser,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser
};
