const { Router } = require('express');
const { getOrdersController, getUserOrdersController, addOrderController, updateOrderController } = require('../controllers/order');
const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { shouldBeRole } = require('../middlewares/validRole');

const router = Router();

router.get('/',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  validFields
], getOrdersController);


router.post('/',[
  validJWT,
], addOrderController);


router.get('/user',[
  validJWT,
], getUserOrdersController);


router.put('/',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  validFields
], updateOrderController);

module.exports = router;