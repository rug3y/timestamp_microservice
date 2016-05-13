var express    = require('express');
var app        = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/css', express.static('public'));

var parseDate = function(date) {

	// if date is only numbers, process as a unix timestamp
	var isUnix = /^[0-9]*$/.test(date);
	if(isUnix) {
		var unixDate = date;
		var naturalDate = new Date(unixDate * 1000).toDateString();
	} else {
		if(new Date(date).toString() != "Invalid Date") {
			var naturalDate = new Date(date).toDateString();
			var unixDate = Math.round(new Date(naturalDate).getTime() / 1000).toString();
		} else {
			var unixDate = null;
			var naturalDate = null;
		};
	};

	var response = {
		"natural": naturalDate,
		"unix": unixDate
		};

	return (response);


	// else, process as a natural date
		// if 'new Date(date)' returns 'Invalid Date', then date = null
		// else if 'new Date(date)' is valid, return datestring and valid unix timestamp
};





// var parseDate = function(date) {
// 	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// 	var full_months = ['January','February','March','April','May','June',
// 					   'July','August','September','October','November','December'];

// 	if(date.match(/^\d{10}$/)) {
// 		var unixDate = date;
// 		var naturalDate = new Date(unixDate * 1000).toDateString();
		
// 	} else if(date.match(/^\d{10}$/) == null) {
// 		// if a natural date is passed rather than a unix timestamp

// 		// parse the month from the date string				   
// 		for(var i in months) {
// 			if(date.search(months[i].toLowerCase()) > -1) {
// 				var month = full_months[i];
// 			};
// 		};

// 		// Create a decent "natural language" date from the given string
// 		var day  = date.match(/\d+/g)[0];
// 		var year = date.match(/\d+/g)[1];

// 		// var naturalDate = month + " " + day +", " + year;
// 		var dateString = month + " " + day + " " + year;
// 		var naturalDate = new Date(dateString).toDateString();
// 		var unixDate = Math.round(new Date(naturalDate).getTime() / 1000).toString();

// 	} else {
// 		var unixDate = null;
// 		var naturalDate = null;
// 	};

// 	var response = {
// 		"natural": naturalDate,
// 		"unix": unixDate
// 		}

// 	return (response);
// };

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// string passed at '/' is saved to date variable and returned.
app.get('/:date', function(req, res) {

	var date = req.params.date.toLowerCase();	
	res.send(parseDate(date));
});

app.listen(port, function() {
	console.log("listening at port " + port);
});