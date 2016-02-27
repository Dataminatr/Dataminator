var express = require('express');
var app = express();
var slackRoutes = require(__dirname + '/routers/slackRouter.js')

app.use('/slack', slackRoutes);
app.set('port', (process.env.PORT || 9001));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*
googleVision.visionImage('ronimage/1771931_orig.jpg', 'TextDetection', function(err,result){
  console.log(result);
})
*/
