var mongoose = require('mongoose');

var OfertasSchema = new mongoose.Schema({
  
  nombre: {
    type: String,
    required: true
  },
  fecha_inicio: {
    type: Date
  },
  fecha_fin: {
    type: Date
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion_corta: {
    type: String,
    required: true
  },
  descripcion_larga: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  geo: {
    type: [Number],
    index: '2d'
  },
  punto: {type: mongoose.Schema.Types.ObjectId, ref:'Punto'},
  categorias: [{type: mongoose.Schema.Types.ObjectId, ref:'Categoria'}],
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

module.exports = mongoose.model('Oferta', OfertasSchema);