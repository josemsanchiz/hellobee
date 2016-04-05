var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Beacons = require('../models/beacons');

var verToken = require('../controllers/token');


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
  res.json({
    success: true,
    message: 'La ruta base para los beacons funciona!'
  })
});

// POST crear

router.post('/crear', function(req, res, next){
  Beacons.create({
    nombre: req.body.nombre,
    uuid: req.body.uuid,
    major: req.body.major,
    minor: req.body.minor,
    geo: [req.body.lat, req.body.long]
  }, function(err, beacon){
    if(err) return next(err)
    res.json({
      success: true,
      message: 'Beacon creado',
      data: beacon
    })
  })
})

// GET obtener

router.get('/obtener', function(req, res, next){
  Beacons.find({}, function(err, beacons){
    if(err){
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    res.json({
      success: true,
      message: 'Peticion correcta',
      data: beacons
    })
  })
})

// GET Obtener/:id

router.get('/obtener/:id', function(req, res, next){
  Beacons.findOne({_id: req.params.id}, function(err, beacon){
    if(err){
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    res.json({
      success: true,
      message: 'Peticion correcta',
      data: beacon
    })
  })
})

// POST Editar/:id

router.post('/editar/:id', function(req, res, next){
  Beacons.findOne({_id: req.params.id}, function(err, beacon){
    if(err) {
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    beacon.nombre = req.body.nombre ? req.body.nombre : beacon.nombre;
    beacon.uuid = req.body.uuid ? req.body.uuid : beacon.uuid;
    beacon.major = req.body.major ? req.body.major : beacon.major;
    beacon.minor = req.body.minor ? req.body.minor : beacon.minor;
    
    beacon.save(function(err, respuesta){
      if(err){
        res.json({
          success: false,
          message: 'Hay un error',
          data: err
        })
      }
      res.json({
        success: true,
        message: 'Edicion correcta',
        data: respuesta
      })
    })
  })
})

// POST /borrar/:id

router.post('/borrar/:id', function(req, res, next){
  Beacons.remove({_id: req.params.id}, function(err){
    if(err) {
      res.json({
        success: false,
        message: 'Ha habido un error',
        data: err
      })
    } else {
      res.json({
        success: true,
        message: 'Se ha borrado correctamente'
      })
    }
  })
})

module.exports = router;
