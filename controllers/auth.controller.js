const User = require('../models/user.schema');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {generateJWT} = require('../helpers/generate-jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    // Verificar si el correo se encuentra en la BD
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password incorrectos - email"
      })
    }

    // Verificar si el usuario se encuentra activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario / Password incorrectos - estado: false"
      }) 
    }

    // Verificar contrasena 
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword){
      return res.status(400).json({
        msg: "Usuario / Password incorrectos - password"
      })
    }


    // Generar el JWT
    const token = await generateJWT(user.id)
    

    res.json({
      msg: 'Login ok',
      user,
      token
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  login,
};
