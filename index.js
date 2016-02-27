var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

// For JSON Parsing
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Setting the Router at Port 9001
app.set('port', (process.env.PORT || 9001));

// To check App status
app.get('/', function(req, res) {
    res.send('Dataminator is Live yo!');
});


// POST request
app.post('/post', function(req, res) {
    var parsedUrl = url.format ({
        pathname : 'https://api.genius.com/search', // API URL ,
        query: {
            access_token: process.env.GOOGLE_ACCESS,
            q: req.body.text
        }
    });

    request(parsedUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var ans = data.response.hits[0].result.url; //firstendpoint = data.endpoint;

            var body = {
                response_type: "in_channel",
                text: ans //firstendpoint
            };

        res.send(body);
    }

  });
});

app.listen(app.get('post'), function() {
    console.log('Dataminator is working on port', app.get('port'));
});
