var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var gcloud = require('gcloud');

var gcs = gcloud.storage({
  projectId: 'launchhack-1142',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
});

var bucket = gcs.bucket('datadocs');

modules.export = function(text){

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

  var filename = Date.now();
  var remoteWriteStream = bucket.file(filename).createWriteStream();

  remoteWriteStream.on ( 'error', function ( err ) {
    console.log ( err );
  });

  docx.generate(remoteWriteStream);

  return 'https://storage.googleapis.com/' +
    cloudStorageBucket +
    '/' + filename; 
};
