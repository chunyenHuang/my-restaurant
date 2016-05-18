var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var dbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/restaurant'

var request = require('request');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(cookieParser());

router.get('/', function (req, res) {
  dbClient.connect(dbUrl, function (err, db) {
    if (!err) {
      var info = db.collection('info');
      info.find({}).toArray(function (err, results) {
        res.json(results[0]);
        db.close();
      })
    } else {
      res.sendStatus(404);
      db.close();
    }
  })
})
router.put('/', function (req, res) {
  var id = req.body._id;
  delete req.body._id;
  dbClient.connect(dbUrl, function (err, db) {
    if (!err) {
      var info = db.collection('info');
      info.update({_id: ObjectId(id)}, {
        $set: req.body
      },function (err, results) {
        res.sendStatus(200);
        db.close();
      })
    } else {
      db.close();
    }
  })
})


module.exports = router;
