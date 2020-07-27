var videos = require('./videoData.js')
var pictures = require('./imageData.js');

// Mock array that contains everything the database contains to be used for testing
let mockDb = []


var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/api', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('mongoose connection error: ', err);
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var mediaSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  mediaType: String,
  url: String,
  thumbnail: String
})

var Item = mongoose.model('Item', mediaSchema);

var insertVideos = (arr) => {
  for (let i = 0; i < 200; i++) {
    var videoId = arr.videos[i].id.videoId
    var newItem = new Item({
      id: i,
      mediaType: 'video',
      url: `https://www.youtube.com/embed/${videoId}`,
      thumbnail: arr.videos[i].snippet.thumbnails.default.url
    })
    mockDb.push(newItem)
    newItem.save()
  }
}

var insertCarouselPictures = (arr) => {
  for (let i = 0; i < 600; i++) {
    var newItem = new Item({
      id: 200 + i,
      mediaType: 'carouselPhoto',
      // '/w_600,h_337' are the dimensions for the pictures in the carousel
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/" + arr[i].public_id + '.' + arr[i].format
    })
    mockDb.push(newItem)
    newItem.save()
  }
}

var insertThumbnailPictures = (arr) => {
  for (let i = 600; i < 700; i++) {
    var newItem = new Item({
      id: 200 + i,
      mediaType: 'thumbnail',
      // '/w_184,h_69' are the dimensions for the thumbnail pictures
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_184,h_69/" + arr[i].public_id + '.' + arr[i].format
    })
    mockDb.push(newItem)
    newItem.save()
  }
}

var insertDescriptionPictures = (arr) => {
  for (let i = 700; i < 800; i++) {
    var newItem = new Item({
      id: 200 + i,
      mediaType: 'descriptionPhoto',
      // '/w_460,h_215' are the dimensions for the pictures in the carousel
      url: "https://res.cloudinary.com/dq3iywusm/image/upload/w_460,h_215/" + arr[i].public_id + '.' + arr[i].format
    })
    mockDb.push(newItem)
    newItem.save()
  }
}


// db.dropDatabase()

insertVideos(videos)

insertCarouselPictures(pictures.pictures);

insertDescriptionPictures(pictures.pictures);

insertThumbnailPictures(pictures.pictures);

module.exports.mockDb = mockDb;