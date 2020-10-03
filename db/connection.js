const mongoose = require('mongoose');

const dev = true; // FLIP FOR DEV/PRODUCTION

const initMongo = async () => {
  const connectDomain = dev ? 'localhost' : 'mongo';
  const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  await mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions);
  const conn = mongoose.connection;
  conn.on('error', (err) => { console.log('mongoose connection error: ', err) });
  conn.once('open', () => { console.log('mongoose connected successfully') });
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
