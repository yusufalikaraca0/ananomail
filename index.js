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

var urlencodedParser = bodyparser.urlencoded({ extended: false })
app.use(express.urlencoded({extended: true}));
const connectionuri = process.env.CONNECTION
app.use(express.static(path.join(__dirname, 'public')));
const jwt = require('jsonwebtoken');
const JWT_SECRET = "superSecret123d00dsa";
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes')
const routes = require('./routes/routes')

//Main
app.use(forgotPasswordRoutes);
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

app.use(routes)






mongoose.connect(connectionuri,{ useNewUrlParser: true, useUnifiedTopology:true},function(err,succ){
    if(err){console.log("error connecting =>"+err)}
    else{app.listen(90,(console.log("Listening")))}
})
