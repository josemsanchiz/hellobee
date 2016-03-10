var mongoose = require('mongoose');

var PuntosSchema = new mongoose.Schema({
  
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  beacon: [{type: mongoose.Schema.Types.ObjectId, ref:'Beacon'}],
  ofertas: [{type: mongoose.Schema.Types.ObjectId, ref:'Oferta'}],
  cliente: {type: mongoose.Schema.Types.ObjectId, ref:'Usuario'},
  categorias: [{type: mongoose.Schema.Types.ObjectId, ref:'Categoria'}],
  geo: {
    type: [Number],
    index: '2d'
  },
  web: String,
  visualizaciones: {
    type: Number,
    default: 0
  },
  favoritos: {
    type: Number,
    default: 0
  },
  creacion: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('Punto', PuntosSchema);