var express = require('express');
var http=require('http');
var https = require('https');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var request = require('request');

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);

var urlencodedParser = bodyParser.urlencoded({extended: false});


app.post('/api', urlencodedParser, function (req, results) {
    //console.log(b);
    request({
        url: "https://secure.splitwise.com/api/v3.0/get_current_user",
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(response);
            console.log(body) ;// Print the json response
        }
        else{
            console.log(error);
        }
    });
    results.send("Thanks!");
});
