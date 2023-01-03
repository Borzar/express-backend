const Role = require('../models/role.schema')
const User = require('../models/user.schema')

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`El role ${role} no esta registrado en la BD`)
  }
}

const isEmailExist = async (email = '') => {
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`El email ${email} ya esta registrado`)
  }
}

const isUserExistId = async (id) => {
  const existUser = await User.findById(id)
  if (!existUser) {
    throw new Error(`El id no existe ${ id }`)
  }
}

module.exports = {
  isRoleValid,
  isEmailExist,
  isUserExistId
}
