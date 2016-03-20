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

app.get("/api",function(req,res){
    request({
    url:"https://www.buxfer.com/api/transactions?token=4e9acbk3lo7hb9vhn80lcfm740",
        json: true},
        function(error,response,body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
                console.log(body);
            }
        });
});

function renderfunction(response){
    console.log(response);
}

var urlencodedParser = bodyParser.urlencoded({extended: true});

app.listen(port, ipaddress);