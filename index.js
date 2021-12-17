'use strict';
const express = require('express');
const ejs = require("ejs")
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Model = require("./models/model");
const User = require("./models/users");
const nodemailer = require('nodemailer')
require('dotenv').config()
require('dotenv/config')
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs")
const request = require('request');
var urlencodedParser = bodyparser.urlencoded({ extended: false })
app.use(express.urlencoded({extended: true}));
const connectionuri = process.env.CONNECTION
app.use(express.static(path.join(__dirname, 'public')));
const jwt = require('jsonwebtoken');
const JWT_SECRET = "superSecret123d00dsa";
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes')

//Main

function sendmail (username, password, to , subject, text) {
  const nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    host: 'mail.xfxpositions.xyz',
    port: 465,
    secure: true,
    auth: {
      user:  username,
      pass:  password
    }
  });
  transporter.verify(function(error, success) {
  
    if (error) throw error;

    console.log('Bağlantı başarıyla sağlandı');
  
  });
  
  let bilgiler = {
    from: 'noreply@xfxpositions.xyz',
    to: to,
    subject: subject,
    text: text,
    //html: 'Eposta <b>HTML metin içeriği</b>'
  };
  
  transporter.sendMail(bilgiler, function(error, info) {
  
    if (error) throw error;
    
    console.log('Eposta gönderildi ' + info.response);
    
  });
}











//Transporter
app.get("/",(req , res)=>{
    Model.find().then(result=>{
        res.render("index",{count:result[0].count})
    })

})
function countadd(){
    var countstat;
    Model.find({id:"616c307003156164755d6bca"}).then(result=>{countstat = result[0].count
        Model.findOneAndUpdate({ id:"616c307003156164755d6bca"}, { count:countstat+1 }, (err, result) => {
            if (err) throw err;
            console.log(result);
          });
        })
}




app.get("/register",(req, res)=>{
   countadd();
})


app.post("/add",urlencodedParser,(req, res)=>{
    var gelen = {
        addr:req.body.addr,
        message:req.body.message
    }






    transporter.verify(function (error, success) {

      if (error) throw error;

      console.log('Bağlantı başarıyla sağlandı');

    });

    let bilgiler = {

      to: 'kavunvesalatalik@gmail.com',
      subject: 'Eposta konu başlığı',
      text: 'Eposta metin2 içeriği',
      html: 'Eposta <b>HTML metin içeriği</b>'
    };

    transporter.sendMail(bilgiler, function (error, info) {

      if (error) throw error;

      console.log('Eposta gönderildi ' + info.response);

    });

    var mycount;

    Model.find().then((result)=>{
       var mycount = result[0].count;
        mycount = Number(mycount)
        console.log(result)


    })
    res.write(JSON.stringify(gelen));
    var gonderim = new Model({
        addr:gelen.addr,
        message:gelen.message
    })
    Model.find().then((result) => {
        gonderim.save()
        .then((result => {
            console.log(result)
        }))
    })







    res.write(JSON.stringify("yes"));
    res.end();

})

app.get('/registration',(req, res)=>{
  res.render('registration');
})
app.post('/registration',urlencodedParser,(req,res)=>{
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




})
app.post('/finduser',urlencodedParser,(req, res)=>{
  
  User.find({'username':req.body.username})
  .then((result)=>{
    console.log(result[0])
    
    if(result[0]==undefined){
      res.end("yes")
     
    }
    else{
     
        res.send("no");
    }
  })

})

app.get("/login",(req,res)=>{
  res.render("login");
})
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
app.post('/login',urlencodedParser,(req, res)=>{
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
    
})


app.use(forgotPasswordRoutes)

app.get('/deneme',(req,res)=>{
  res.render("deneme");
})
mongoose.connect(connectionuri,{ useNewUrlParser: true, useUnifiedTopology:true},function(err,succ){
    if(err){console.log("error connecting =>"+err)}
    else{app.listen(90,(console.log("Listening")))}
})
