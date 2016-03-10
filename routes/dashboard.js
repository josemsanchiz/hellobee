var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuarios');

var config = require('../config/config');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');


// GET base 

router.get('/', function(req, res, next){
  res.render('dashboard/index.ejs')
})
module.exports = router;

// POST Login

router.post('/login', function(req, res, next){
  Usuario.findOne({
    email: req.body.email
  }, function(err, usuario){
    if(err) return next(err)
    if(!usuario) {
      res.render('login', {mensaje: 'El usuario no existe'})
    } else if(usuario){
      bcrypt.compare(req.body.password, usuario.password, function(err, response){
        if(err) return next(err)
        if(response){
          var token = jwt.sign(usuario, config.secret, {
            expiresInMinutes: 1440
          });
          
          res.render('dashboard/index', {token: token});
            
        } else {
          res.render('login', {mensaje: 'Contraseña incorrecta'})
        }
      })
    }
  })
})