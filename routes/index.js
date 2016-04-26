var express = require('express');
var router = express.Router();
// Import controller functions from ../controllers
var userControllers = require("../controllers/user.js");
var register = require('../controllers/register.js');
var auth = require('../controllers/auth.js');
var passport = require('../controllers/jwt-passport.js');

// GET home page
//router.use('/', express.static("/public"));

// users
router.get('/users/:id', userControllers.getUser);
router.get('/users', userControllers.getAllUsers);
router.post('/users', register);
router.patch('/users/:id', userControllers.patchUpdate);
router.delete('/users/:id', userControllers.deleteUser);

// Use basic auth, return JWT
router.get('/auth', auth.authenticate, auth.jwt);

// Export the router
module.exports = router;
