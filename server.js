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

var connectionString = 'mongodb://127.0.0.1:27017/CS5610';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.use(multer());
app.use(session({ secret: "Bansal" ,
    resave : true,
    saveUninitialized : true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//console.log(process.env.PASSPORT_SECRET);

require("./public/assignment/server/app.js")(app,db,mongoose);
require("./public/project/server/app.js")(app,db,mongoose);


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

    //console.log(token);
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

app.post("/api/usergroups",urlencodedParser,function(req,res){

    var token = req.body.token;

    //console.log(token);
    request({
            url:"https://www.buxfer.com/api/groups?&token="+ token,
            json: true},
        function(error,response,body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
                //console.log(body);
            }
            else{
                console.log(req.body);
            }
        });
});

app.listen(port, ipaddress);