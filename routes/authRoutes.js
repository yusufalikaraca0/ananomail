const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
router.get('/registration',(req, res)=>{
    res.render('registration');
  })

  
router.post('/registration',authController.registration_post)
router.post('/finduser',authController.finduser)
router.get("/login",authController.registration_login);
router.post('/login',authController.login_post);

