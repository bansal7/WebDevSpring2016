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

    //console.log(req);
    //console.log(req.data);
    //console.log(req.body);

    var username = req.body.userid;
    var password = req.body.password;

    //console.log(username);
    //console.log(password);

    request({
    url:"https://www.buxfer.com/api/login?&userid="+ username + "&password=" + password,
    //url:"https://www.buxfer.com/api/login?userid="+ "bansalshah1993@gmail.com" + "&password=" + "webdev2016",

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


var urlencodedParser = bodyParser.urlencoded({extended: true});

app.listen(port, ipaddress);