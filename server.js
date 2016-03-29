var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('https');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');


var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.use(multer());
app.use(session({ secret: "Bansal" }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//console.log(process.env.PASSPORT_SECRET);

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);



app.post("/api",urlencodedParser,function(req,res){

    var username = req.body.userid;
    var password = req.body.password;
    request({
            url:"https://www.buxfer.com/api/login?&userid="+ username + "&password=" + password,
            json: true},
        function(error,response,body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
            else{
                console.log(req.body);
            }
        });
});

app.post("/api/transactions",urlencodedParser,function(req,res){

    var token = req.body.token;

    console.log(token);
    request({
            url:"https://www.buxfer.com/api/transactions?&token="+ token,
            json: true},
        function(error,response,body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
            else{
                console.log(req.body);
            }
        });
});


var urlencodedParser = bodyParser.urlencoded({extended: true});

app.listen(port, ipaddress);