const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const authController = require('../controllers/auth_controller');

router.get('/profile', usersController.profile);
// router.get('/login', usersController.login);

router.get('/signup', authController.signup);
router.get('/login', authController.login);
router.post('/create_user', usersController.create);
router.post('/create', usersController.createSession);
router.post('/logout', usersController.endSession);

module.exports=router;