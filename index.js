process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/ronll/Documents/Dataminator/modules/../config/testVisionApi-02064f733b63.json';

var express = require('express');
var app = express();
var slackRouter =  require('./routers/slack.js')
var googleVision = require(__dirname + '/controllers/googleVision.js')

googleVision.visionImage( 'ronimage/IMG_0191.JPG', 'LabelDetection', function(err,result){ 
  console.log(result);
})
