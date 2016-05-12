var express    = require('express');
var app        = express();

// ToDo:
// 1. After receiving date string, parse date string.
// 2. Determine if date string contains 'natural language' date or Unix date.
// 3. If a valid date is passed in 'natural' or Unix format, translate it to the other format.
// 4. Make the date pretty and readable in both formats.
// 5. Return the date in both formats.

// Function to parse date. Use regex to detect groupings of numbers/ letters in date string?
var parseDate = function(date) {
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var full_months = ['January','February','March','April','May','June',
					   'July','August','September','October','November','December'];

	if(date.match(/^\d{10}$/)) {
		var unixDate = date;
		var naturalDate = new Date(unixDate * 1000).toDateString();
		
	} else if(date.match(/^\d{10}$/) == null) {
		// if a natural date is passed rather than a unix timestamp

		// parse the month from the date string				   
		for(var i in months) {
			if(date.search(months[i].toLowerCase()) > -1) {
				var month = full_months[i];
			};
		};

		// Create a decent "natural language" date from the given string
		var day  = date.match(/\d+/g)[0];
		var year = date.match(/\d+/g)[1];

		var naturalDate = month + " " + day +", " + year;
		var unixDate = Math.round(new Date(naturalDate).getTime() / 1000).toString();

	} else {
		var unixDate = null;
		var naturalDate = null;
	};

	var response = {
		"natural": naturalDate,
		"unix": unixDate
		}

	return (response);
};

// string passed at '/' is saved to date variable and returned.
app.get('/:date', function(req, res) {

	var date = req.params.date.toLowerCase();	
	res.send(parseDate(date));
});

app.listen(8080, function() {
	console.log("listening at port 8080")
});