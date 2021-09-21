const { Router } = require('express');

const { getRolesController } = require('../controllers/role');

const router = Router()

/**
 * @swagger
 * role/:
 *  get:
 *    summary: Get roles
 *    description: Get all api user roles
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Hola
 *        type: json
 */
router.get('/', getRolesController);

module.exports = router;