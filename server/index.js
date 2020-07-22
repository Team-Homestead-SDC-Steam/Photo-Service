var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index.js');
var getMedia = require('../db/index.js');

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get(`/api/media/:gameId`, (req, res) => {
  //gets the id out of the request url
  // let gameId = window.location.href.slice(window.location.href.indexOf('/:') + 2, window.location.href.length)
  let gameId = req.url.slice(req.url.indexOf(':') + 1, req.url.length)
  db.getMedia(gameId, (err, data) => {
    console.log('function invoked')
    if (err) {
      console.log('error with app.get in server file: ', err)
    }
    res.send(data)
  })
})

app.listen(3004, function () {
  console.log('listening on port 3004');
});