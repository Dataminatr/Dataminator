var officegen = require('officegen');
var generateName = require('sillyname');
var fs = require('fs');
var path = require('path');
var gcloud = require('gcloud');

var gcs = gcloud.storage({
  projectId: 'launchhack-1142',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
});

var cloudStorageBucket = 'datadocs';
var bucket = gcs.bucket(cloudStorageBucket);

module.exports = function(text){

  var docx = officegen ( 'docx' );

  docx.on ( 'finalize', function ( written ) {
    console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
  });

  docx.on ( 'error', function ( err ) {
    console.log ( err );
  });

  var pObj = docx.createP ();

  pObj.addText ( text );
  docx.putPageBreak ();
  var pObj = docx.createP ();	 

  pObj.addText ( '\nMade with unicorn\'s tears from Dataminator\n', {font_face: 'URW Gothic L'});
  pObj.addImage ( __dirname + '/../assets/Robot.icon' ) ;

  var filename = generateName().replace(/\W+/g, '-').toLowerCase() + Date.now() + '.docx';
  var remoteWriteStream = bucket.file(filename).createWriteStream();

  remoteWriteStream.on ( 'error', function ( err ) {
    console.log ( err );
  });

  docx.generate(remoteWriteStream);

  return 'https://storage.googleapis.com/' +
    cloudStorageBucket +
    '/' + filename; 
};
