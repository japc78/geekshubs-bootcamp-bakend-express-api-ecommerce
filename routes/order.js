const { Router } = require('express');
const { getOrdersController, addOrderCartController } = require('../controllers/order');
const { validJWT } = require('../middlewares/validJWT');

const router = Router();

router.get('/',[
  validJWT,
], getOrdersController);


router.post('/',[
  validJWT,
], addOrderCartController);

module.exports = router;