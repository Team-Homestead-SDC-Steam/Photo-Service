const {mongoose, db, gameSchema, Game} = require('./connection.js')

const createGame = async (id, assets) => await Game.create({id:id, assets:JSON.parse(assets).assets});
const readGame = async (id) => await Game.findOne({id:id});
const updateGame = async (id, assets) => await Game.findOneAndUpdate({id:id},{assets:JSON.parse(assets).assets},{new: true});
const deleteGame = async (id) => await Game.findOneAndDelete({id:id});
const readAllGames = async () => await Game.find();
const deleteAllGames = async () => await Game.deleteMany();


/* OLD INDEX CONTENT */

//   const numberOfVideos = 200;
//   const numberOfCarouselPhotos = 600;
  
//   var mediaSchema = mongoose.Schema({
//     id: { type: Number, unique: true },
//     gameId: Number,
//     mediaType: String,
//     url: String
//   })
  
//   var Item = mongoose.model('Item', mediaSchema);

//   // Picks 2 videos and 6 carousel photos from the database
//   var generateIds = (id) => {
//     var idArr = []
//     idArr.push((id) * 2, (id) * 2 + 1)
//     idArr.push(200 + id * 6, 200 + id * 6 + 1, 200 + id * 6 + 2, 200 + id * 6 + 3, 200 + id * 6 + 4, 200 + id * 6 + 5)
//     return idArr
//   }

// var getMedia = (param, callback) => {
//   var Ids = generateIds(param)
//   Item.find().where('id').in(Ids).exec((err, data) => {
//     if (err) {
//       console.log('error with getMedia in db file: ', err)
//     }
//     callback(null, data)
//   })
// }

module.exports.db = db;
module.exports.getMedia = getMedia;
module.exports.Game = Game;
module.exports.createGame = createGame;
module.exports.readGame = readGame;
module.exports.updateGame = updateGame;
module.exports.deleteGame = deleteGame;
