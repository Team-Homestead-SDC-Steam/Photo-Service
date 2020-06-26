var videos = require('./videoData.js')
var pictures = require('./imageData.js');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/media', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var mediaSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  mediaType: String,
  url: String
})

var Item = mongoose.model('Item', mediaSchema);

var insertVideos = (arr) => {
  for (let i = 0; i < 20; i++) {
    var videoId = arr.videos[i].id.videoId
    var newItem = new Item({
      id: i,
      mediaType: 'video',
      url: `https://www.youtube.com/embed/${videoId}`
    })
    newItem.save()
  }
}

var insertCarouselPictures = (arr) => {
  for (let i = 0; i < 600; i++) {
    var newItem = new Item({
      id: 20 + i,
      mediaType: 'carouselPhoto',
      // '/w_600,h_337' are the dimensions for the pictures in the carousel
      // url: arr.pictures[0].url.slice(0, arr.pictures[0].url.indexOf('v')) + 'w_600,h_337/' + arr.pictures[0].url.substring(arr.pictures[0].url.indexOf('v') + 12, arr.pictures[0].url.length)
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/" + arr[i].public_id + '.' + arr[i].format
    })
    newItem.save()
  }
}

var insertThumbnailPictures = (arr) => {
  for (let i = 600; i < 700; i++) {
    var newItem = new Item({
      id: 20 + i,
      mediaType: 'thumbnail',
      // '/w_184,h_69' are the dimensions for the thumbnail pictures
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_184,h_69/" + arr[i].public_id + '.' + arr[i].format
    })
    newItem.save()
  }
}

var insertDescriptionPictures = (arr) => {
  for (let i = 700; i < 800; i++) {
    var newItem = new Item({
      id: 20 + i,
      mediaType: 'descrptionPhoto',
      // '/w_460,h_215' are the dimensions for the pictures in the carousel
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_460,h_215/" + arr[i].public_id + '.' + arr[i].format
    })
    newItem.save()
  }
}


// db.dropDatabase()

insertVideos(videos)

insertCarouselPictures(pictures.pictures);

insertDescriptionPictures(pictures.pictures);

insertThumbnailPictures(pictures.pictures);