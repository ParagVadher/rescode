const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const authController = require('../controllers/auth_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
// router.get('/login', usersController.login);

router.get('/signup', authController.signup);
router.get('/login', authController.login);
router.post('/create_user', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
),usersController.createSession);

module.exports=router;