var mongoose = require('mongoose');

var UsuariosSchema = new mongoose.Schema({
  
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
          unique: true
      }
  },
  localidad: String,
  genero: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  rol: {
    type: String,
    default: 'usuario'
  },
  password: {
    type: String,
    required: true
  },
  dispositivos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dispositivo'}],
  puntos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Punto'}],
  ofertas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Oferta'}],
  guardadas: String,
  avatar: {
    type: String,
    default: 'no_logo.png'
  },
  creacion: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('Usuario', UsuariosSchema);