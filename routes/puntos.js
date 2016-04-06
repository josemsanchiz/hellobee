var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Puntos = require('../models/puntos');
var Usuario = require('../models/usuarios');
var Beacons = require('../models/beacons');

var verToken = require('../controllers/token');

// GET Obtener puntos por proximidad, no verifica token

router.get('/obtener/prox/:idLat/:idLng', function(req, res, next){
  
  /*var distancia = 1000/6371;
  console.log('Lat: ' + req.params.idLat + ' Long: ' + req.params.idLng );
  var query = Puntos.find({
    'geo': {
      $near: [
        req.params.idLat,
        req.params.idLng
      ], $maxDistance: distancia
    }
  }, function(err, puntos){
    if(err) {
      res.json({
        success: false,
        message: 'Hay algún error',
        data: err
      })
    } else {
      res.json({
        success: true,
        message: 'Petición correcta',
        data: puntos
      })
    }
  })*/
  
  var lat = parseFloat(req.params.idLat);
  var lng = parseFloat(req.params.idLng);
  
  
  Puntos.geoNear([lat, lng], {
    maxDistance: 3000,
    spherical: true
  }, function(err, results, stats){
    if(err){
      res.json({
        success: false,
        data: err
      })
    }
    
    res.json({
      success:true,
      data: results,
      stats: stats
    })
  })
})

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

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Tengo acceso a esta id de usuario: ' + req.decoded._doc._id)
  res.json({
    success: true,
    message: 'La ruta base para los puntos funciona!'
  })
});

// POST /:idUsuario/crear/:idBeacon este punto solo debe ser accesible por administradores

router.post('/crear/:idBeacon', function(req, res, next){
  Puntos.create({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    localidad: req.body.localidad,
    telefono: req.body.telefono,
    email: req.body.email,
    beacon: req.params.idBeacon,
    cliente: req.decoded._doc._id,
    geo: [req.body.lat, req.body.lng],
    web: req.body.web
  }, function(err, punto){
    if(err) {
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    res.json({
      success: true,
      message: 'Punto creado',
      data: punto
    })
  })
})

// GET /obtener

router.get('/obtener', function(req, res, next){
  Puntos.find({})
  .where('cliente').equals(req.decoded._doc._id)
  .populate('beacon')
  .exec(function(err, punto){
    if(err){
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    res.json({
      success: true,
      message: 'Consulta correcta',
      data: punto
    })
  })
})



module.exports = router;
