const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion',
    });
  }

  try {
    const myuid = jwt.verify(token, process.env.SECRETKEY);

    // leer al usuario que corresponde al uid
    const user = await User.findById(myuid.payload.uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token no valido - El usuario no existe en DB',
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'Token no valido - El usuario con state: false',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no valido',
    });
  }
};

module.exports = {
  validateJWT,
};
