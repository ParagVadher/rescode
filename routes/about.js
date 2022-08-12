const express = require('express');
const router = express.Router();

const aboutController=require('../controllers/about_controller');
router.get('/license-agreement',aboutController.license);

module.exports=router;