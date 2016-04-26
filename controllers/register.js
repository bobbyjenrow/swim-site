var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(req, res){
  if(!req.body.email || !req.body.password){
    res.json({success: false, message: 'Please enter a valid email and password.'});
  }else{
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err){
        if(err){return res.json({success: false, message: 'That email address already exists.'});
        }
        res.json({success: true, message: 'Successfully created new user!'});
      });
  }
}
