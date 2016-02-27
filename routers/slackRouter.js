var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/post', function(req, res){
  var parsed_url = url.format({
    pathname: 'https://api.genius.com/search',
    query: {
      access_token: process.env.GENIUS_ACCESS,
      q: req.body.text
    }
  });

});

module.exports = router;
