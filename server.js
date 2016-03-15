var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/api', urlencodedParser, function (req, results) {

    request({
        url: "http://www.shortreckonings.com/api/1.0/query.php?e[]=50,(*1,1)&e[]=30,(2,*1)&map=Joe,Mary",
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            results.json(body);
        }
    });

});
app.listen(port, ipaddress);