var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('https');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);

var urlencodedParser = bodyParser.urlencoded({extended: true});

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