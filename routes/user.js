const { Router } = require('express');
const { getUserController } = require('../controllers/user');

const router = Router()

router.get('/', getUserController);

module.exports = router;