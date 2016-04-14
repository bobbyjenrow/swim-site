var express = require('express');
var router = express.Router();
// Import controller functions from ../controllers
var userControllers = require("../controllers/user.js");

// GET home page
//router.use('/', express.static("/public"));

// users
router.get('/users/:id', userControllers.getUser);
router.get('/users', userControllers.getAllUsers);
router.post('/users', userControllers.createUserAccount);
router.patch('/users/:id', userControllers.patchUpdate);
router.delete('/users/:id', userControllers.deleteUser);

// Export the router
module.exports = router;
