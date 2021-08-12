const { Router } = require('express');
const { getUserController, addUserController } = require('../controllers/user');

const router = Router()

router.get('/', getUserController);
router.post('/', addUserController);

module.exports = router;