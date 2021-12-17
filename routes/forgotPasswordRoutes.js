const express = require('express');
const router = express.Router();
const User = require('../models/users');
router.get('/forgotpassword',(req, res)=>{
    res.render('forgotpassword');
  })
  
  
router.post('/forgotpassword',(req, res)=>{
  var gelen = {
    username:req.body.username,
    
  }
    User.find({username:gelen.username}).then((result)=>{
      if(result[0] != undefined){
        var secret = JWT_SECRET+result[0].password;
        var user = {
          username: result[0].username,
          email_password: result[0].email_password,
          forgotmail: result[0].forgotmail
        }
        var token = jwt.sign(user,secret,{expiresIn:'15m'});
        var link = 'http://localhost:90/reset-password/'+user.username+'/'+token;
        
        sendmail('noreply@xfxpositions.xyz','yusuf123_',user.forgotmail,'e-posta şifre yenileme bağlantısı xfxpositions',' Xfxpositions için şifre yenileme bağlantısı: '+link);
        res.end('ok');
      }
      else{
        res.end("Bulunamadı!");
      }
    })
});

 
router.get('/reset-password/:username/:token',(req, res, next)=>{
  var username = req.params.username
  var token = req.params.token
  console.log('username = '+username +' token = '+token)
  User.find({username:username}).then((result)=>{
    if(result[0] != undefined){
      if(username !== result[0].username){
        res.send('Invalid id');
        return;
      }
      var secret =  JWT_SECRET + result[0].password;
      try{
        const payload = jwt.verify(token,secret)
        res.render('passwordreset')
      }
      catch(error){
        console.log(error.message);
        res.end(error.message);
      }
    }
    else{
      res.send('invalid user')
    }
  })
})


router.post('/reset-password/:username/:token',(req,res,next)=>{
  var username = req.params.username
  var token = req.params.token
  console.log('username = '+username +' token = '+token)
  User.find({username:username}).then((result)=>{
    if(result[0] != undefined){
      if(username !== result[0].username){
        res.send('Invalid id');
        return;
      }
      var secret =  JWT_SECRET + result[0].password;
      try{
        const payload = jwt.verify(token,secret)
        User.findOneAndUpdate({ username: result[0].username }, { password: req.body.password }, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
        
        res.end('password has been changed!');
      }
      catch(error){
        console.log(error.message);
        res.end(error.message);
      }
    }
    else{
      res.send('invalid user')
    }
  })
})