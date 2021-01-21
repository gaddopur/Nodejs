var express = require('express');
const { compile } = require('morgan');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  // console.log(req.headers.json());
  res.render('index', { title: 'Express' });
});

module.exports = router;
