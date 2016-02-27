var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var googleVision = require(__dirname + '/../controllers/googleVision.js')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res){
  var imageURL = req.body.text;
  var image;
  https.get(imageURL, function(res){
    res.on('data', function(chunk){
      image += chunk;
    })

    res.on('end', function() {
      console.log(image);
      googleVision.visionImage( image, 'TextDetection', function(err,result){
	console.log(result, 'text detection');
      })
    })
  });
});

module.exports = router;
