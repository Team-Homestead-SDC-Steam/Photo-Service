var videos = require('./videoData.js')
var pictures = require('./imageData.js');

// console.log(videos)

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

var insertPictures = (arr) => {
  for (let i = 0; i < 80; i++) {
    var newItem = new Item({
      id: 20 + i,
      mediaType: 'photo',
      url: arr.pictures[i].url
    })
    newItem.save()
  }
}

// db.dropDatabase()

insertVideos(videos)

insertPictures(pictures);


