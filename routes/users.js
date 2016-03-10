var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/usuarios');

var config = require('../config/config');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

// GET base 

router.get('/obtener', function(req, res, next){
  Usuario.find({}, function(err, usuarios){
    if(err) return next(err)
    res.json(usuarios);
  })
  
})

/* POST crear usuario */
router.post('/crear', function(req, res, next) {
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      if (err) return next(err)
      req.body.hash = hash;
      next()
    })
  })
});

router.post('/crear', function(req, res, next) {
  Usuario.create({
    nombre: req.body.nombre,
    email: req.body.email,
    localidad: req.body.localidad,
    genero: req.body.genero,
    localidad: req.body.localidad,
    fecha_nacimiento: req.body.fecha_nacimiento,
    password: req.body.hash,
    rol: req.body.rol
  }, function(err, usuario){
    console.log('He creado al usuario:');
    if (err) return next(err)
    res.redirect('/');
  })
});

// POST Login

router.post('/login', function(req, res, next){
  Usuario.findOne({
    email: req.body.email
  }, function(err, usuario){
    if(err) return next(err)
    if(!usuario) {
      res.json({success: false, message: 'Usuario no encontrado'});
    } else if(usuario){
      bcrypt.compare(req.body.password, usuario.password, function(err, response){
        if(err) return next(err)
        if(response){
          var token = jwt.sign(usuario, config.secret, {
            expiresInMinutes: 1440
          });
          
          res.json({
            success: true,
            message: 'Login correcto!',
            token: token
          })
        } else {
          res.json({
            success: false,
            message: 'La contraseña es incorrecta!'
          })
        }
      })
    }
  })
})

// GET token

router.get('/token', function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['hellobee-access-token'];
  
  if(token){
    jwt.verify(token, config.secret, function(err, decoded){
      if(err){
        res.json({
          success: false,
          message: 'El token no es valido'
        })
      } else {
        console.log(decoded._doc.nombre);
        res.json({
          success: true,
          data: decoded
        })
      }
      
    })
  }
  
})

router.post('/editar/:idUsuario', function(req, res, next){
  Usuario.findOne({_id: req.params.idUsuario}, function(err, usuario){
    if(err){
      res.json({
        success: false,
        message: 'Hay un error',
        data: err
      })
    }
    
    usuario.nombre = req.body.nombre ? req.body.nombre : usuario.nombre;
    usuario.email = req.body.email ? req.body.email : usuario.email;
    usuario.localidad = req.body.localidad ? req.body.localidad : usuario.localidad;
    usuario.genero = req.body.genero ? req.body.genero : usuario.genero;
    usuario.fecha_nacimiento = req.body.fecha_nacimiento ? req.body.fecha_nacimiento : usuario.fecha_nacimiento;
    usuario.rol = req.body.rol ? req.body.rol : usuario.rol;
    
    usuario.save(function(err, respuesta){
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

// GET /Login obtiene la pantalla para hacer login

router.get('/login', function(req, res, next){
  res.render('login.ejs', {mensaje:false});
})

// GET /crear obtiene la pantalla para hacer registro

router.get('/crear', function(req, res, next){
  res.render('registro.ejs');
})

module.exports = router;
