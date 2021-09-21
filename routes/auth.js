const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { authLoginController, authLogoutController } = require('../controllers/auth');

const router = Router()

/**
 * @swagger
 *  /api/auth/login:
 *    post:
 *      description: Login to the application
 *      produces:
 *        -application/json
 *      parameters:
 *        - name: Email y password
 *          description: User email for login.
 *          in: body
 *          require: true
 *          type: object
 *          example: { "email": "user1@test.com", "password": "123456" }
 *      responses:
 *        200:
 */
router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validFields
], authLoginController);


router.post('/logout',[validJWT], authLogoutController);


module.exports = router;