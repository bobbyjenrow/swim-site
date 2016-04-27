var jwt = require('jsonwebtoken');
var config = require('./config');

var myid = {
  _id: "571fb972a6abbc4d59e1b35e"
};

var token = jwt.sign(myid, config.secret, {expiresIn: "10m"});

var obj;

var test = function(tokens){
  jwt.verify(tokens, config.secret, function(err, decoded){
    obj = decoded;
    if(err){console.log(err);}
    console.log(obj._id);
  })
};

test(token);

// var myId = "571fb972a6abbc4d59e1b35e";
// var decodedId = "571fb972a6abbc4d59e1b35e";
