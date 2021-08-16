const { Router } = require('express');

const { getRolesController } = require('../controllers/role');

const router = Router()

router.get('/', getRolesController);

module.exports = router;