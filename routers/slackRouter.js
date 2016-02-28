var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var googleVision = require(__dirname + '/../controllers/googleVision.js');
var officeDocs = require(__dirname + '/../modules/officeDocx.js')
//var driveAuth = require(__dirname + '/../modules/driveAuth.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res){
  var imageURL = req.body.text;
  var userName = req.body.user_name;
  var responseURL = req.body.response_url;

  res.send('processing request ...');

  googleVision.visionImage(imageURL, 'TextDetection', function(err,result){

    var text = result.responses[0].textAnnotations[0].description;
    var link = officeDocs(text);
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et felis libero. Pellentesque habitant morbi tristique senectus et netus et."

    var options = {
      uri: responseURL,
      method: 'POST',
      json: {
	"response_type": "in_channel",
	"username": "Dataminator",
	"attachments": [
	  {
	    "color": "#1aa3ff",
            "author_name": 'Courtesy of @' + userName,
	    "title": "Document Download",
            "title_link": link,
	    "thumb_url": "http://johnprados.com/wp-content/uploads/2013/08/word.png",
            "text": lore,
	    "mrkdwn_in": ["text", "pretext", "author_name"]
	  }
	], 
      }
    };

  request(options, function( err, response, body){
    if(err) console.log(err);
  });
  })
});

module.exports = router;
