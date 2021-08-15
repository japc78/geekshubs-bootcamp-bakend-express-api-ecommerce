const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { authLoginController, authLogoutController } = require('../controllers/auth');

const router = Router()

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validFields
], authLoginController);

router.post('/logout',[validJWT], authLogoutController);

module.exports = router;