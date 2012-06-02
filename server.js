var express = require('express'),
	mongoose = require('mongoose'),
	_ = require('underscore')._,
	SENSIS_APIKEY = require('./sensis-apikey.js');

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

var PORT = 3000;
console.log(SENSIS_APIKEY);
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);