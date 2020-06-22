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
  id: {type: Number, unqiue: true},
  mediaType: String,
  url: String
})

var Item = mongoose.model('Item', mediaSchema);

var insertPictures = () => {
  for (let i = 1; i < 81; i++) {
    var newItem = new Item({
      id: i,
      mediaType: 'photo',
      url: `https://loremflickr.com/320/240?lock=${i}`
    })
    newItem.save()
  }
}

// insertPictures();