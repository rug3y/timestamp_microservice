var express    = require('express');
var app        = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/css', express.static('public'));

var parseDate = function(date) {

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
};


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