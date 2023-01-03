const User = require('../models/user.schema');
const bcryptjs = require('bcryptjs');

const userGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const users = await User.find().skip(Number(from)).limit(Number(limit));

  const total = await User.countDocuments();

  res.json({ total, users });
};

const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.json({
    user,
  });
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - controller',
  });
};

const userDelete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.json({ user });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
