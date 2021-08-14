const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/validFields');
const { authLoginController, authLogoutController } = require('../controllers/auth');

const router = Router()

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validFields
], authLoginController);

router.post('/logout', authLogoutController);

module.exports = router;