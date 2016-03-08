var express = require('express');
//var request = require('request');
//var OAuth   = require('oauth-1.0a');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//var request = require('request');

app.listen(port, ipaddress);