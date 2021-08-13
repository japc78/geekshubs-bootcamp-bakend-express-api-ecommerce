const { Router } = require('express');
const { authLoginController, authLogoutController } = require('../controllers/auth');

const router = Router()

router.post('/login', authLoginController);
router.post('/logout', authLogoutController);

module.exports = router;