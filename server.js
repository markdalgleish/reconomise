var express = require('express'),
	mongoose = require('mongoose'),
	_ = require('underscore')._,
	config = require('./config.js');

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

var PORT = 3000;
console.log(config.sensis_apikey);
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);