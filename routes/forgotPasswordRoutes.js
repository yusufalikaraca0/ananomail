const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../controllers/forgotPasswordController')


router.get('/forgotpassword',forgotPasswordController.forgotpassword_get)
router.post('/forgotpassword',forgotPasswordController.forgotpassword_post)
router.get('/reset-password/:username/:token',forgotPasswordController.resetpassword_get)
router.post('/reset-password/:username/:token',forgotPasswordController.resetpassword_post)

module.exports = router;