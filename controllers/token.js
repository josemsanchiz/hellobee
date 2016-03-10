var jwt = require('jsonwebtoken');

var config = require('../config/config');

module.exports.verifyToken = function(request, callback){
  var token = request.body.token || request.query.token || request.headers['hellobee-access-token'];
  
  if(token){
    jwt.verify(token, config.secret, function(err, decoded){
      if(err){
        callback(null, err)
      } else {
        callback(decoded, null)
      }
      
    })
  }
}