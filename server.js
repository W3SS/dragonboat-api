
// BASE SETUP
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_4svzbkbh:8s5a1ndhf23sokh4q2hmgest7m@ds041496.mlab.com:41496/heroku_4svzbkbh', (err, res) => {
  if (err) {
    console.log('ERROR connecting to: ' + process.env.MONGODB_URI + '. ' + err);
    process.exit(1);
  }
  else {
    console.log('Succeeded connecting to: ' + process.env.MONGODB_URI);

    // START THE SERVER
    app.listen(port);
    console.log('App running on port ' + port);
  }
});

var User = require('./app/models/user');

// API ROUTES
var router = express.Router();

// test route to make a new user;
router.get('/', (req, res) => {
  res.json({ message : 'hooray! welcome to our api!'});
});

// more routes to follow
router.route('/users')
.post((req, res) => {
  var user = new User();
  user.name = req.body.name;

  // save user info
  user.save((err) => {
    if (err) {
      res.send(err);
    }
    res.json({
      message : 'User Created!'
    });
  });
})

.get((req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  })
})

// REGISTER OUR routes
// all of our routes prefixed with /api
app.use('/api', router);
