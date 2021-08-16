const { Router } = require('express');
const { check } = require('express-validator');

const { getUserController, addUserController, updateUserController, deleteUserController} = require('../controllers/user');

const { validFields } = require('../middlewares/validFields');
const { isValidRole } = require('../helpers/dbValidators');
const { validJWT } = require('../middlewares/validJWT');

const router = Router()

router.get('/',[
  validJWT,
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
], deleteUserController);


module.exports = router;