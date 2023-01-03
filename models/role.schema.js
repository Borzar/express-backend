const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new Schema({
  role: {
    type: String,
    required: [true, 'El role es obligatorio'],
  },
})

module.exports = mongoose.model('Role', userSchema)
