const mongoose = require('mongoose');

const dev = true; // FLIP FOR DEV/PRODUCTION

const initMongo = async () => {
  console.log('Trying to connect to Mongoose server');
  const connectDomain = dev ? 'localhost' : 'mongo';
  const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  const conn = mongoose.connection;
  await mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions, (err) => {
    console.log(err ? `Mongoose connection error: ${err}` : 'Mongoose connected successfully.');
  });
}

const db = initMongo();

/* IF ERRORS, CHECK STATUS -> sudo systemctl status mongod 
   OR START IT sudo systemctl start mongod */

const assetSchema = mongoose.Schema({
  mediaType: String,
  url: String,
  thumbnail: String
})

const gameSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  assets: [assetSchema],
})

const Game = mongoose.model('Game',gameSchema, 'games')

module.exports.mongoose = mongoose;
module.exports.db = db;
module.exports.gameSchema = gameSchema;
module.exports.Game = Game;