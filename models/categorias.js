var mongoose = require('mongoose');

var CategoriasSchema = new mongoose.Schema({
  
  nombre: {
    type: String,
    required: true
  },
  puntos: [{type: mongoose.Schema.Types.ObjectId, ref:'Punto'}],
  ofertas: [{type: mongoose.Schema.Types.ObjectId, ref:'Oferta'}],
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

module.exports = mongoose.model('Categoria', CategoriaSchema);