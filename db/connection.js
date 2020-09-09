const mongoose = require('mongoose');

const dev = true; // FLIP FOR DEV/PRODUCTION

const connectDomain = dev ? 'localhost' : 'mongo';
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions);
const db = mongoose.connection;

/* IF ERRORS, CHECK STATUS -> sudo systemctl status mongod 
   OR START IT sudo systemctl start mongod */

db.on('error', (err) => { console.log('mongoose connection error: ', err) });
db.once('open', () => { console.log('mongoose connected successfully') });

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
module.exports.connectDomain = connectDomain;
module.exports.db = db;
module.exports.gameSchema = gameSchema;
module.exports.Game = Game;
