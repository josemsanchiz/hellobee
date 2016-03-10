var express = require('express');
var router = express.Router();
var configuracion = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});


module.exports = router;
