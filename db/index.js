var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/media', { useNewUrlParser: true, useUnifiedTopology: true });

const numberOfVideos = 20;
const numberOfCarouselPhotos = 600;

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

var generateIds = () => {
  var idArr = []
  for (let i = 0; i < 2; i++) {
    var id = Math.floor(Math.random() * numberOfVideos)
  }
}

// var getMedia = callback => {
//   Item.find({})
// }

module.exports.db = db;