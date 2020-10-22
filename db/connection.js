const mongoose = require('mongoose');

const DEV_PATH = '/home/damien/rpt21/sdc/';
const SERVER_IP = '52.12.135.244'; // static IP
const dev = process.argv[1].startsWith(DEV_PATH);

const initMongo = async () => {
  const connectDomain = dev ? 'localhost' : SERVER_IP;
  const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  try {
    console.log (`mongodb://${connectDomain}/api`);
    await mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions);
  } catch(err) {
    console.log('mongoose connection error: ', err)
  }
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
