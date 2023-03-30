console.log('NODE_ENV :::', process.env.NODE_ENV);
// if (process.env.NODE_ENV === 'PRODUCTION') {
//     var app = require('./prod.app.js'); 
// } else {
//     var app = require('./dev.app.js');
// }
var express = require('express');
var path = require('path');
var routes = require('./db/routes/index.js');
var http = require('http');
var favicon = require('serve-favicon');
var PORT = 3000;

/* 
 * shared code in production and development 
*/

// favicon - 3 ways - middleware, static, html 
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
// app.use('/favicon.ico', express.static(path.join(__dirname, '../public/images/favicon.ico')));
// app.use('images/favicon.ico', express.static(path.join(__dirname, '../public/images/favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// static files
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../public")));

// db - mongo
var db = require('./db/index.js');
db.once("open", function (err) {
    // console.log('db::: ', db);
    if (err) {
        return console.error(err);
    } else {
        console.log("Successfully connected to mongodb");
    }
})

// routes
app.use(routes); 
// serve index.html if can't find the route
app.use('*', function (req, res, next) {
    console.log("...serving index.html file from the public folder")
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// create server 
var server = http.createServer(app);
server.listen(PORT);
console.log(`server listening on post ${PORT}`);
var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorialsPoint');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var name = req.body.name;
   var email =req.body.email;
   var pass = req.body.password;
   var phone =req.body.phone;

   var data = {
      "name": name,
      "email":email,
      "password":pass,
      "phone":phone
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");