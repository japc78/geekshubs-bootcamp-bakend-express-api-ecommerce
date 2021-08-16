const { Router } = require('express');
const { check } = require('express-validator');

const { getUserController, addUserController, updateUserController, deleteUserController} = require('../controllers/user');

const { isValidRole } = require('../helpers/dbValidators');

const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { isAdminRole } = require('../middlewares/validRole');

const router = Router()

router.get('/',[
  validJWT,
  isAdminRole
], getUserController);


router.post('/sign-up',[
  check('role').custom(isValidRole),
  validFields
], addUserController);


router.put('/:id',[
  validJWT,
], updateUserController);


router.delete('/:id',[
  validJWT,
  isAdminRole
], deleteUserController);


module.exports = router;