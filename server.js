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
	business_id: String,
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
	}],
	sensis_data: String
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
	if (businesses.length === 0) res.send([]);
	
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
				businesses[i].sensis_data = JSON.stringify(result);
			});
			
			res.send(businesses);
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

app.del('/api/events/:id', function(req, res) {
	Event.find({_id: req.params.id }).remove(function(err) {
		if (err) {
			console.log('Error deleting event');
			res.send('error');
		} else {
			console.log('Successfully deleted event');
			res.send('success');
		}
	});
});

// TODO: Allow event updates
app.put('/api/events/:id', function(req, res) {
	console.log(req);
});

app.post('/api/events/:event_id/businesses', function(req, res) {
	var business = new Business();
	
	Event.find({_id: req.params.event_id }, function(err, docs) {
		if (err) {
			res.send('error');
			return;
		}
		
		business.events.push(docs[0]);
		
		business.business_id = req.body.business_id;
		business.needs = req.body.needs || [];
		business.offers = req.body.offers || [];
		
		business.save(function(err) {
			if (err) {
				console.log('Error saving business');
				res.send('error');
			} else {
				console.log('Successfully saved business');
				res.send('success');
			}
		});
	});
});

app.get('/api/events/:event_id/businesses', function(req, res) {
	Business.find({'events._id': req.params.event_id}, function(err, docs) {
		returnBusinessData(res, docs);
	});
});

app.get('/api/events/:event_id/businesses/:business_id', function(req, res) {
	Business.find({'events._id': req.params.event_id, business_id: req.params.business_id }, function(err, docs) {
		returnBusinessData(res, docs);
	});
});

app.del('/api/events/:event_id/businesses/:business_id', function(req, res) {
	Business.find({'events._id': req.params.event_id, business_id: req.params.business_id }).remove(function(err) {
		if (err) {
			console.log('Error deleting business');
			res.send('error');
		} else {
			console.log('Successfully deleted business');
			res.send('success');
		}
	});
});

// TODO: Update a business
app.put('/api/events/:event_id/businesses/:business_id', function(req, res) {
	console.log(req);
});

var PORT = 3000;
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);