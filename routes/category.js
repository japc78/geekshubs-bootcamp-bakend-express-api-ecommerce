const { Router } = require('express');
const { check } = require('express-validator');

const {
  getCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController
} = require('../controllers/category');

const { categoryNameExits } = require('../helpers/dbValidators');
const { validFields } = require('../middlewares/validFields');
const { validJWT } = require('../middlewares/validJWT');
const { isAdminRole, shouldBeRole } = require('../middlewares/validRole');

const router = Router()

router.get('/',[
  validJWT,
], getCategoriesController);


router.post('/add',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  check('category.name', 'The name is required').notEmpty(),
  check('category.name').custom(categoryNameExits),
  validFields
], addCategoryController);


router.put('/update/:id',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
  check('id', 'The id not is valid').isMongoId(),
  check('category.name', 'The name is required').notEmpty().optional(),
  check('category.name').custom(categoryNameExits),
], updateCategoryController);


router.delete('/delete/:id',[
  validJWT,
  isAdminRole
], deleteCategoryController);


module.exports = router;