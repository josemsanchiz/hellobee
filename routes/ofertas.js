var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Puntos = require('../models/puntos');
var Usuario = require('../models/usuarios');
var Beacons = require('../models/beacons');
var Ofertas = require('../models/ofertas');

var verToken = require('../controllers/token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: 'La ruta base para las ofertas funciona!'
  })
});

// GET * ruta middleware para comprobar si hay token

router.get('*', function(req, res, next) {
  verToken.verifyToken(req, function(datos, err){
    if(err) {
      res.json({
        success:false,
        message: 'El token no es correcto',
        data: err
      })
    }else if (datos) {
      req.decoded = datos;
      next();
    }
  })
});

// POST * ruta middleware para comprobar si hay token

router.post('*', function(req, res, next) {
  verToken.verifyToken(req, function(datos, err){
    if(err) {
      res.json({
        success:false,
        message: 'El token no es correcto',
        data: err
      })
    }else if (datos) {
      req.decoded = datos;
      next();
    }
  })
});



// POST /crear Esta ruta solo debe ser accesible si el usuario esta registrado como cliente

router.post('/crear', function(req, res, next){
  var rolCliente = req.decoded._doc.rol;
  
  if(rolCliente === 'cliente'){
    res.json({
      message: 'El usuario está registrado como cliente',
      data: rolCliente
    })
  } else if(rolCliente === 'usuario'){
    res.json({
      message: 'El usuario está registrado como usuario',
      data: rolCliente
    })
  } else {
    res.json({
      message: 'El usuario está registrado como otro tipo',
      data: rolCliente
    })
  }
  
})



module.exports = router;
