var express = require('express');
var bodyParser = require('body-parser');
var {db, getMedia, Game, createGame, readGame, updateGame, deleteGame} = require('../db/index.js');
var compression = require('compression')
const cors = require('cors');

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression()); // Follow-up: Is this doing anything?
app.use(cors());

app.post(`/api/media/`, async (req, res) => { // *CREATE*
  try { res.send( await createGame(req.query.id,req.query.assets)) }
  catch(err) { res.status(401).send(`Game ${req.query.id} was not created:\n${err}`) }
});

app.get(`/api/media/:id`, async (req, res) => { // *READ*
  try { res.send( await readGame(req.params.id)) }
  catch(err) { res.status(401).send(`Game ${req.params.id} not found:\n${err}`) }
})

app.put(`/api/media/`, async (req, res) => { // *UPDATE*
  try { res.send( await updateGame(req.query.id,req.query.assets)) }
  catch(err) { res.status(401).send(`Game ${req.query.id} was not updated:\n${err}`) }
});

app.delete(`/api/media/:id`, async (req, res) => { // *DELETE*
  try { res.send( await deleteGame(req.params.id)) }
  catch(err) { res.status(401).send(`Game ${req.params.id} was not deleted:\n${err}`) }
});

app.listen(3004, function () {
  console.log('listening on port 3004');
});