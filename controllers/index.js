var mongoose = require('mongoose');
var configuracion = require('../config/config');

var request = require('request-promise');

module.exports.loginApi = function(callback){
  var options = {
      method: 'POST',
      uri: configuracion.mt_url + 'oauth2/access_token',
      form: {
          client_id: configuracion.mt_client,
          grant_type: 'password',
          username: configuracion.mt_user,
          password: configuracion.mt_password
      },
      headers: {
          /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
      }
  };

  request(options)
      .then(function (body) {
          // POST succeeded...
          var arreglado = JSON.parse(body)
          console.log('En teoria he hecho la autentificacion: ' + arreglado.access_token);
          console.log('Tengo esto en el body: ' +arreglado);
          callback(arreglado);
      })
      .catch(function (err) {
          // POST failed...
          console.log('Estoooo, hay un error');
      });
}

module.exports.getBeacons = function(callback){
  var options = {
      uri: configuracion.mt_url + 'v2.0/beacons',
      headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': 'Bearer ' + configuracion.access_token
      },
      json: true // Automatically parses the JSON string in the response
  };

  request(options)
      .then(function (repos) {
          console.log('User has %d repos', repos.length);
          callback(repos);
      })
      .catch(function (err) {
          console.log('Hay un error: ' + err);
      });
}