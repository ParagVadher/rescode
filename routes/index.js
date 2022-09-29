const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const postController = require('../controllers/posts_controller');
const authController = require('../controllers/auth_controller');

router.get('/', homeController.home);
router.get('/gamefeed', homeController.gamefeed);

router.get('/posts', postController.post);
router.get('/signup', authController.signup);
router.get('/login', authController.login);

router.use('/users', require('./users'));
router.use('/about', require('./about'));

module.exports = router;