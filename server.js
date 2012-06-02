var express = require('express'),
	mongoose = require('mongoose'),
	_ = require('underscore')._;

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

var PORT = 3000;
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);