const mongoose = require('mongoose');

const dev = true; // FLIP FOR DEV/PRODUCTION

const initMongo = async () => {
<<<<<<< HEAD
  console.log('Trying to connect to Mongoose server');
  const connectDomain = dev ? 'localhost' : 'mongo';
  const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  const conn = mongoose.connection;
  await mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions, (err) => {
    console.log(err ? `Mongoose connection error: ${err}` : 'Mongoose connected successfully.');
  });
=======
  const connectDomain = dev ? 'localhost' : 'mongo';
  const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  await mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions);
  const conn = mongoose.connection;
  conn.on('error', (err) => { console.log('mongoose connection error: ', err) });
  conn.once('open', () => { console.log('mongoose connected successfully') });
>>>>>>> 64e6dda7e36c15db3a9dae90a81c417b4bc11932
}

const db = initMongo();

/* IF ERRORS, CHECK STATUS -> sudo systemctl status mongod 
   OR START IT sudo systemctl start mongod */

<<<<<<< HEAD
=======

>>>>>>> 64e6dda7e36c15db3a9dae90a81c417b4bc11932
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
<<<<<<< HEAD
module.exports.Game = Game;
=======
module.exports.Game = Game;
>>>>>>> 64e6dda7e36c15db3a9dae90a81c417b4bc11932
