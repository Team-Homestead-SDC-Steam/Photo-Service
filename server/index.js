var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index.js');
var getMedia = require('../db/index.js');

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/media/items', (req,res) => {
  db.getMedia((err, data) => {
    if (err) {
      console.log('error with app.get in server file: ', err)
    }
    res.send(JSON.stringify(data))
  })
})

app.listen(3001, function() {
  console.log('listening on port 3001!');
});