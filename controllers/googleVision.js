process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '/../config/Launchhack_Project_1142-3df5aed82da3.json';
var gcvisionapi = require(__dirname + '/../node_modules/gc-vision-api/src/gc-vision-api.js');
var VisionApi = gcvisionapi.VisionApi;
var Feature= gcvisionapi.Feature;
var Image = gcvisionapi.Image;

var client = VisionApi.init(
    {
      keyFileName: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });

module.exports = {
  visionImage: function(imageURL,feature, callback){
    var request = client.request();
    var image = Image.remote(imageURL);

  request
  .image(image)
  .feature(Feature[feature], 2)
  .subscribe(function(result){
    console.log(result)
    var err = null;
    callback(err, result);
  });
  }
}
