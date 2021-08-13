const { Router } = require('express');
const { getUserController, addUserController, updateUserController, deleteUserController} = require('../controllers/user');

const router = Router()

router.get('/', getUserController);
router.post('/', addUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;