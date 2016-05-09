var express = require('express');
var router = express.Router();
var passport = require('passport');
// Import controller functions from ../controllers
var userControllers = require("../controllers/user.js");
var register = require('../controllers/register.js');
var auth = require('../controllers/auth.js');
var checkJwt = require('../controllers/jwt-passport.js');
var wktControllers = require('../controllers/workout.js');
require('../controllers/auth').auth(passport);
require('../controllers/jwt-passport')(passport);

// GET home page
//router.use('/', express.static("/public"));

// users
router.get('/users/:id', userControllers.getUser);
router.get('/users', userControllers.getAllUsers);
router.post('/users', register);
router.patch('/users/:id', userControllers.patchUpdate);
router.delete('/users/:id', userControllers.deleteUser);

// Use basic auth, return JWT
router.get('/auth', passport.authenticate('login', {session: false}), auth.jwt);
// Test to check if JWT authentication works
router.get('/test',  passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! Your logged-in user id is: ' + req.user._id + '.');
});

router.get('/workouts', wktControllers.getWorkouts);
router.get('/workouts/:id', wktControllers.getWorkout);
router.post('/workouts', wktControllers.createWorkout);
router.patch('/workouts/:id', wktControllers.updateWorkout);
router.delete('/workouts/:id', wktControllers.removeWorkout);


// Export the router
module.exports = router;
