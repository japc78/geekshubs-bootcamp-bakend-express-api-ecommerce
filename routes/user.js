const { Router } = require('express');
const { getUserController, addUserController, updateUserController } = require('../controllers/user');

const router = Router()

router.get('/', getUserController);
router.post('/', addUserController);
router.put('/:id', updateUserController);

module.exports = router;