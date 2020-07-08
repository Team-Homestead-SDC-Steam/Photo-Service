var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true, useUnifiedTopology: true });

const numberOfVideos = 200;
const numberOfCarouselPhotos = 600;

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
  url: String
})

var Item = mongoose.model('Item', mediaSchema);


// Picks 2 videos and 6 carousel photos from the database
var generateIds = () => {
  var idArr = []
  while (idArr.length < 2) {
    var id = Math.floor(Math.random() * numberOfVideos)
    if (!idArr.includes(id)) {
      idArr.push(id)
    }
  }
  while (idArr.length < 8) {
    var id = numberOfVideos + Math.floor(Math.random() * numberOfCarouselPhotos)
    if (!idArr.includes(id)) {
      idArr.push(id)
    }
  }
  return idArr
}

var getMedia = (param, callback) => {
  var Ids = generateIds()
  Item.find(param).where('id').in(Ids).exec((err, data) => {
    if (err) {
      console.log('error with getMedia in db file: ', err)
    }
    callback(null, data)
  })
}

module.exports.db = db;
module.exports.getMedia = getMedia;