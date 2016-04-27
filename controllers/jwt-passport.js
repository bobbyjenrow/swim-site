var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config.js');
var passport = require('passport');


//JwtStrategy looks for an Authorization header with the  format-- Authorization: JWT <JSON_WEB_TOKEN_STRING>

module.exports = function(passport) {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

// function(request){
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
//   opts.secretOrKey = config.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done){
//     User.findOne({_id: jwt_payload.sub}, function(err, user){
//       if(err){return done(err, false);}
//       if(user){
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     });
//   }));
// };
