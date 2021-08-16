const { Router } = require('express');
const { getUserController, addUserController, updateUserController, deleteUserController} = require('../controllers/user');

const { validJWT } = require('../middlewares/validJWT');

const router = Router()

router.get('/',[
  validJWT,
], getUserController);


router.post('/', addUserController);


router.put('/:id',[
  validJWT,
], updateUserController);


router.delete('/:id',[
  validJWT,
], deleteUserController);


module.exports = router;