var express = require('express'),
	mongoose = require('mongoose'),
	_ = require('underscore')._,
	config = require('./server-config.js');

var app = express.createServer();

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
    res.send('Hello World');
});

var PORT = 3000;
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);