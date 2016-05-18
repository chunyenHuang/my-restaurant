// Express
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
// Database
var mongodb = require('mongodb');
var dbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/restaurant'

// Module Tools
var request = require('request');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/info', require('./routes/info'));
app.use('/product', require('./routes/product'));
app.use('/products', require('./routes/products'));

app.use(express.static('./public/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/public/app/index.html');
})

if (!require.main.loaded) {
  app.listen(port, function () {
    console.log('running on port: '+ port);
  })
}

app.on('close', function() {
  console.log('rs');
})

module.exports = app;
