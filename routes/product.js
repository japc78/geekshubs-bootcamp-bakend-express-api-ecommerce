const { Router } = require('express');
const { check } = require('express-validator');

const { addProductController, updateProductController, deleteProductController, getProductController } = require('../controllers/product');
const { productNameExits, categoryExitsById, isTheSameSeller, productExitsById } = require('../helpers/dbValidators');
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
  validFields
], addProductController);


router.put('/update/:id',[
  validJWT,
  check('id', 'The id not is valid').isMongoId(),
  check('id').custom(productExitsById),
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  check('id').custom(isTheSameSeller),
  check('data.name', 'The name is required').notEmpty().optional(),
  check('data.name').custom(productNameExits).optional(),
  check('data.category', 'Not is valid id').isMongoId().optional(),
  check('data.category').custom(categoryExitsById).optional(),
  check('data.price', 'Should be a Number').isNumeric().optional(),
  check('data.state', 'Should be true or false').isBoolean(),
  validFields
], updateProductController);


router.delete('/delete/:id',[
  validJWT,
  check('id', 'The id not is valid').isMongoId(),
  check('id').custom(productExitsById),
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  check('id').custom(isTheSameSeller),
], deleteProductController);


module.exports = router;