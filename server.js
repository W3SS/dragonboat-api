
// BASE SETUP
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Connect to database
var uristring = process.env.MONGOLAB_URI ||
process.env. ||
'mongodb://localhost/dragonboat-api'

var mongoose = require('mongoose');
mongoose.connect(uristring, (err, res) => {
  if (err)
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  else
    console.log('Succeeded connecting to: ' + uristring);
});

var User = require('./app/models/user');

// START THE SERVER
//
app.listen(port);
console.log('Magic happens on port ' + port);


// API ROUTES
var router = express.Router();

// test route to make a new user;
router.get('/', (req, res) => {
  res.json({ message : 'hooray! welcome to our api!'});
});

// more routes to follow

// REGISTER OUR routes
// all of our routes prefixed with /api
app.use('/api', router);
