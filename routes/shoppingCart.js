const { Router } = require('express');
const { getShoppingCartController, updateShoppingCartController } = require('../controllers/shoppingCart');
const { validJWT } = require('../middlewares/validJWT');

const router = Router();

router.get('/',[
  validJWT,
], getShoppingCartController);


router.post('/update',[
  validJWT,
], updateShoppingCartController);

module.exports = router;