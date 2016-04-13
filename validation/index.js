var lowerCaseString = function(v){
  var regexp = /^[a-z0-9_-]{4,16}$/;
  return regexp.test(v);
};

var mixedCaseString = function(v){
  var regexp = /^[a-z0-9_-]{4,16}$/i;
  return regexp.test(v);
};

var password = function(v){
  var regexp = /^[a-z0-9_-]{6,24}$/i;
  return regexp.test(v);
};

var email = function(v){
  var regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
  return regexp.test(v);
};

var url = function(v){
  var regexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regexp.test(v);
};

var objectId = function(v){
  var regexp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  return regexp.test(v);
};

var roles = ["swimmer", "coach"];

// Basic use: validate: {validator: validator.lowerCaseString,  message: '{VALUE} is not a valid input!'}


module.exports = {
  lowerCaseString: lowerCaseString,
  mixedCaseString: mixedCaseString,
  password: password,
  email: email,
  url: url,
  roles: roles,
  objectId: objectId
};
