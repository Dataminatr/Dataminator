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

  googleVision.visionImage(imageURL, 'TextDetection', function(err,result){
    res.send(result);
  })
});

module.exports = router;
