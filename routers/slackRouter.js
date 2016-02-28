var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var googleVision = require(__dirname + '/../controllers/googleVision.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res){
  var imageURL = req.body.text;
  res.send('request processing...');

  googleVision.visionImage(imageURL, 'TextDetection', function(err,result){
    console.log('result!!!!:', result);

    var text = result.body.responses[0].textAnnotations[0].description;


    var options = {
      uri: 'https://hooks.slack.com/commands/T0P9WTN3D/23404613106/l3x5HGnINuHrXz2sk50k4PO4',
      method: 'POST',
      json: {
        "username": "Dataminator",
        "icon_emoji": ":robot_face:",
        "text": text 
      }
    };

    request(options);
  })
});

module.exports = router;
