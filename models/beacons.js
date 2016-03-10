var mongoose = require('mongoose');

var BeaconsSchema = new mongoose.Schema({
  
  nombre: {
    type: String
  },
  uuid: {
    type: String
  },
  major: {
    type: Number,
    default: 0
  },
  minor: {
    type: Number,
    default: 0
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  punto: {type: mongoose.Schema.Types.ObjectId, ref:'Punto'},
  creacion: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('Beacon', BeaconsSchema);