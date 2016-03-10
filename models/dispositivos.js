var mongoose = require('mongoose');

var DispositivosSchema = new mongoose.Schema({
  
  nombre: {
    type: String
  },
  marca: String,
  modelo: String,
  sistema: String,
  version: String,
  uuid: String,
  creacion: {
    type: Date,
    default: Date.now
  },
  visualizaciones: {
    type: Number,
    default: 0
  },
  guardados: {
    type: Number,
    default: 0
  },
  favoritos: {
    type: Number,
    default: 0
  }
  
})

module.exports = mongoose.model('Dispositivo', DispositivosSchema);