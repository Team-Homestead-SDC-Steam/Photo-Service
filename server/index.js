// const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression')
const cors = require('cors');

const DEV_PATH = '/home/damien/rpt21/sdc/';
const dev = process.argv[1].startsWith(DEV_PATH);

let {mongoose, db, getMedia, Game, createGame, readGame, updateGame, deleteGame} = require('../db/index.js');

// process.argv.includes('cluster') ? require('./cluster.js') : false


const initExpress = () => {
  
  console.log('Mongoose connected: initializing routes')

  var app = express();
  app.use('/app', express.static(__dirname + '/../public'));
  // app.use(bodyParser.urlencoded({ extended: true })); //is this doing anything?
  app.use(express.json());
  // app.use(compression()); // Follow-up: Is this doing anything?
  app.use(cors());
  
  app.get('/app/:gameId', (req, res) => { //* SERVE REACT WEB CONTENT
    res.sendFile(path.resolve("./public/index.html"));
  });
  
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

}

// Cluster nodes (optional; select by adding the "cluster" parameter)
if ( require('./cluster.js').init(require('cluster')) ) mongoose.connection.on('open', initExpress );
