const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN || 3000)

    console.log('Base de datos online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al iniciar la base de datos')
  }
}

module.exports = {
  dbConnection,
}
