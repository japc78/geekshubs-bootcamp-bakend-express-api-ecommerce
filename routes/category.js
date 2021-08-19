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
  check('name', 'The name is required').notEmpty(),
  check('name').custom(categoryNameExits),
  validFields
], addCategoryController);


router.put('/update',[
  validJWT,
  shouldBeRole('SELLER_ROLE', 'ADMIN_ROLE'),
], updateCategoryController);


router.delete('/:id',[
  validJWT,
  isAdminRole
], deleteCategoryController);


module.exports = router;