const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/gamefeed', homeController.gamefeed);

router.use('/api', require('./api'));

router.use('/users', require('./users'));
router.use('/about', require('./about'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;