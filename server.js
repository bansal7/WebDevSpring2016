var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/api', urlencodedParser, function (req, results) {

    request({
        url: "",
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            results.json(body);
        }
    });

});
app.listen(port, ipaddress);