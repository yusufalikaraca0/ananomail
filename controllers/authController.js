const User = require('../models/users');
const request = require('request');
const registration_post =(req,res) => {
    var gelen = {
        username:req.body.username,
        password:req.body.password,
        forgotmail:req.body.forgotmail
    }
    User.find({'username': gelen.username})
    .then((result => {
      console.log(result[0]);
      if(result[0] != undefined){
       res.end("Error:Kullanıcı Adı Alınmış")
      }
      else{
        var parola = Math.random().toString(36).substring(2,12);
        console.log(parola);
        request.post(
          'http://localhost:80/Php/index.php',
          {
            formData: {
                addr: gelen.username,
                pass: parola
                },
          },
          (error,response, body) => {
            if (error) {
              console.error(error)
              console.log(body.data)
              return;
            }
            else{
              console.log(body)
              var gonderim = new User({
                username:gelen.username,
                password:gelen.password,
                email_password:parola,
                forgotmail:gelen.forgotmail
              })
              gonderim.save()
                .then((result => {
                    console.log(result);
                    res.end("Hesabınız Oluşturulmuştur..");
    
    
                }))
            }
          })
    
    }
    })) 
}

function finduser(username,callback){
    User.find({username:username}).then((result)=>{
      if(result[0]!=undefined){
        callback(result[0].username,result[0].password);
      }
      else{
        callback("nope");
      }
    })
  }

const login_get = (req,res)=>{
    res.render("login");
}

const login_post = (req, res) => {
    var gelen = {
        username:req.body.username,
        password:req.body.password
      }
      finduser(gelen.username,function(username,password){
        console.log(password);
        if(gelen.password == password){
          res.end("password=true");
        }
        else{
          res.end('password=false');
        }
      })
}
module.exports = {
    registration_post,
    finduser,
    registration_login,
    login_get,
    login_post
}