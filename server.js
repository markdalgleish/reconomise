var http = require('http'),
	express = require('express'),
	mongoose = require('./models.js'),
	_ = require('underscore')._,
	config = require('./server-config.js'),
	MOCK_BUSINESS_DATA = require('./mock-business-data.js');
	
mongoose.connect(config.mongodb_url);

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

app.get('/api/test', function(req, res) {
	var id_string = ''
	_.each(MOCK_BUSINESS_DATA, function(business) {
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
	
});

var PORT = 3000;
console.log('Listening on port ' + PORT + '...');
app.listen(PORT);