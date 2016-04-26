var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(req, res){
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    res.json({success: false, message: 'Please enter a valid email and password.'});
  }else{
      var newUser = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        username: req.body.username
      };
      User.create(newUser, function(err){
        if(err){return res.json({success: false, message: 'There was an error: ', error: err});
        }
        res.json({success: true, message: 'Successfully created new user!'});
      });
  }
}
