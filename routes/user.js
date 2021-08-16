const { Router } = require('express');
const { check } = require('express-validator');

const { getUserController, addUserController, updateUserController, deleteUserController} = require('../controllers/user');

const { isValidRole, emailExists, isTheSameEmail } = require('../helpers/dbValidators');

const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { isAdminRole } = require('../middlewares/validRole');

const router = Router()

router.get('/',[
  validJWT,
  isAdminRole
], getUserController);


router.post('/sign-up',[
  check('user.email', 'Email is required').isEmail(),
  check('user.password', 'Password is required').notEmpty(),
  check('user.password', 'Password must be at least 6 chars long').isLength({ min: 6 }),
  check('user.name', 'Name is required').notEmpty().trim(),
  check('user.email').custom(emailExists),
  check('user.role').custom(isValidRole),
  validFields,
], addUserController);


router.put('/update',[
  validJWT,
  check('data.email', 'Email should be valid').optional().isEmail(),
  check('data.name', 'Name is required').optional().notEmpty().trim(),
  check('data.email').custom(isTheSameEmail).optional(),
  check('data.role').custom(isValidRole).optional(),
  validFields,
], updateUserController);


router.delete('/:id',[
  validJWT,
  isAdminRole
], deleteUserController);


module.exports = router;