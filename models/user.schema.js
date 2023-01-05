const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const UserSchema = new Schema({
  google: {
    type: Boolean,
    default: false,
  },

  state: {
    type: Boolean,
    default: true,
  },

  role: {
    type: String,
    require: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },

  img: {
    type: String,
  },

  password: {
    type: String,
    require: [true, 'password requerido'],
  },

  email: {
    type: String,
    require: [true, 'email requerido'],
    unique: true,
  },

  name: {
    type: String,
    require: [true, 'Nombre requerido'],
  },
})

  // Funcion para no mostrar la password en el body 
  UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user  
  }

module.exports = mongoose.model('User', UserSchema)
