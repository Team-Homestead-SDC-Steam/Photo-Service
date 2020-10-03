const {mongoose, db, gameSchema, Game} = require('./connection.js')

const createGame = async (id, assets) => await Game.create({id:id, assets:JSON.parse(assets).assets});
const readGame = async (id) => await Game.findOne({id:id});
const updateGame = async (id, assets) => await Game.findOneAndUpdate({id:id},{assets:JSON.parse(assets).assets},{new: true});
const deleteGame = async (id) => await Game.findOneAndDelete({id:id});
const readAllGames = async () => await Game.find();
const deleteAllGames = async () => await Game.deleteMany();


module.exports.mongoose = mongoose;
module.exports.db = db;
module.exports.Game = Game;
module.exports.createGame = createGame;
module.exports.readGame = readGame;
module.exports.updateGame = updateGame;
module.exports.deleteGame = deleteGame;
module.exports.deleteAllGames = deleteAllGames;