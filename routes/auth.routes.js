const { Router } = require('express');
const { check } = require('express-validator');

const {
  login,
} = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validations-fields');

const router = Router();

router.post('/login',[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateFields
], login);


module.exports = router;
