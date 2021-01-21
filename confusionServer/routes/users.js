var express = require('express');
var bodyParser = require('body-parser');
var users = require('../model/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  users.findOne({username: req.body.username})
  .then(user => {
    if(user != null) {
      var error = new Error("This user name is already exists!");
      error.status = 403;
      next(err);
    }
    else {
      return users.create({
        username:req.body.username, 
        password:req.body.password});
    }
  })
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({staus:'You sucessfully signed up', user:user});
  }, err => next(err))
  .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  if(!req.session.user) {
    users.findOne({username: req.body.username})
    .then(user => {
      if(user == null) {
        var err = new Error("User of this " + req.body.username + " is not exists!");
        err.status = 403;
        next(err);
      }
      else if(user.password != req.body.password) {
        var err = new Error("You write a wrong password pls make sure that you rember the password");
        err.status = 403;
        next(err);
      }
      else {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are sucessfully authenticated');
      }
    })
    .catch(err => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already logged in');
  }
});

router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
