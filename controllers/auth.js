var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var BasicStrategy = require('passport-http').BasicStrategy;
var logger = require('morgan');

module.exports.auth = passport.use('login', new BasicStrategy(
  {
  },
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err){return done(err);}
      if(!user){ return done(null, false, {message: 'User not found'});}
      user.comparePassword(password, function(err, isMatch){
        console.log(password + isMatch + err)
        if(err && !isMatch){
          return done(null, user);
        } else{
          return done(null, false);
        }
      })
    })
  }
));

module.exports.jwt = function(req, res){
  var token = jwt.sign(req.user._id, config.secret, {
    expiresIn: 10080
  });
  res.json({success: true, token: ('JWT' +  token), message: req.user});
}

module.exports.authenticate = passport.authenticate('login', {session: false});
