const { Router } = require('express');
const { check } = require('express-validator');

const { addProductController, updateProductController, deleteProductController, getProductController } = require('../controllers/product');
const { productNameExits, categoryExitsById, sellerExitsById } = require('../helpers/dbValidators');
const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { isAdminRole, shouldBeRole } = require('../middlewares/validRole');

const router = Router()

router.get('/',[
  validJWT,
], getProductController);


router.post('/add',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  check('data.name', 'The name is required').notEmpty(),
  check('data.name').custom(productNameExits),
  check('data.category', 'Not is valid id').isMongoId(),
  check('data.category').custom(categoryExitsById),
], addProductController);


router.put('/update/:id',[
  validJWT,
], updateProductController);


router.delete('/delete/:id',[
  validJWT,
  isAdminRole
], deleteProductController);


module.exports = router;