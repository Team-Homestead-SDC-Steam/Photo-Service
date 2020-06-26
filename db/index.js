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


// getMedia = (type, callback) => {
//   Item.find({'mediaType': type}, (err, data) => {
//     if (err) {
//       console.log('error with getThumbnails: ', err)
//     }
//     callback(null, data)
//   })
// }

// var thumbnails = getMedia('thumbnail', (err, data) => {
//   if (err) {
//     console.log('error with getMedia: ', err)
//   }
//   return data;
// })

// var getThumbnails = (value) => {
//   return Item.find({'mediaType': value}).exec()
// }

// thumbnails = async() => {
//   const object = await getThumbnails('thumbnail')
//   return object;
// }


// console.log('thumbnail variable: ', thumbnails)

module.exports.db = db;
// module.exports.thumbnails = thumbnails;