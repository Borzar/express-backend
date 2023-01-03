const { Router } = require('express');
const { check } = require('express-validator');
const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require('../controllers/user.controller');

const {
  isRoleValid,
  isEmailExist,
  isUserExistId,
} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validations-fields');

const router = Router();

router.get('/', userGet);

router.post(
  '/',
  [
    // check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password', 'El password debe ser mas de 6 letras').isLength({
      min: 6,
    }),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isEmailExist),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  userPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(isUserExistId),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  userPut
);

router.patch('/', userPatch);

router.delete(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(isUserExistId),
    validateFields,
  ],
  userDelete
);

module.exports = router;
