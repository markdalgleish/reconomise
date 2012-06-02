var http = require('http'),
	express = require('express'),
	mongoose = require('mongoose'),
	_ = require('underscore')._,
	config = require('./server-config.js'),
	MOCK_BUSINESS_DATA = require('./mock-business-data.js');

mongoose.connect(config.mongodb_url);

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
	id: ObjectId,
	name: String
});
var Event = mongoose.model("Event", EventSchema);

var BusinessSchema = new Schema({
	business_id: Number,
	events: [EventSchema],
	needs: [{
		type: String,
        comments: String,
        urgency: Number
	}],
	offers: [{
		type: String,
        comments: String,
        availability: Number
	}]
});
var Business = mongoose.model("Business", BusinessSchema);

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

function returnBusinessData(res, businesses) {
	var id_string = ''
	_.each(businesses, function(business) {
		id_string += business.business_id + ',';
	});
	id_string = id_string.substr(id_string, id_string.length - 1);
	
	var options = {
		host: 'api.sensis.com.au',
		port: 80,
		path: '/ob-20110511/test/getByListingId?key=' + config.sensis_apikey + '&query=' + id_string
	};
	
	http.get(options, function(sensis_response) {
		sensis_response.setEncoding('utf8');
		sensis_response.on('data', function (chunk) {
			var data = JSON.parse(chunk);
			
			_.each(data.results, function(result, i) {
				MOCK_BUSINESS_DATA[i].sensis_data = result;
			});
			
			res.send(MOCK_BUSINESS_DATA);
		});
	});
}

app.get('/api/test', function(req, res) {
	returnBusinessData(res, MOCK_BUSINESS_DATA);
});

app.get('/api/events', function(req, res) {
	Event.find({}, function(err, docs) {
		res.send(docs);
	});
});

app.post('/api/events', function(req, res) {
	var event = new Event();
	event.name = req.body.name;
	
	console.log(event.name);
	
	event.save(function(err) {
		if (err) {
			console.log('Error saving event');
			res.send('error');
		} else {
			console.log('Successfully saved event');
			res.send('success');
		}
	});
});

app.get('/api/events/:id', function(req, res) {
	Event.find({_id: req.params.id }, function(err, docs) {
		res.send(docs);
	});
});

app.put('/api/events/:id', function(req, res) {
	console.log(req);
});

app.post('/api/events/:event_id/businesses', function(req, res) {
	console.log(req);
});

app.get('/api/events/:event_id/businesses', function(req, res) {
	console.log(req);
});

app.get('/api/events/:event_id/businesses/:business_id', function(req, res) {
	console.log(req);
});

app.put('/api/events/:event_id/businesses/:business_id', function(req, res) {
	console.log(req);
});

var PORT = 3000;
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);