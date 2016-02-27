var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res){
  var imageURL = req.body.text;
  var image;
  http.get(imageURL, function(res){
    res.on('data', function(chuck){
      image += chunk;
    })

    res.on('end', function() {
      console.log(image);
    })
  });
});

module.exports = router;
