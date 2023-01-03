const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_CNN)

    console.log('Base de datos online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al iniciar la base de datos')
  }
}

module.exports = {
  dbConnection,
}
