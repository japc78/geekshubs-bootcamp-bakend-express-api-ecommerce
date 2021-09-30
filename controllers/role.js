const { response, request } = require('express');

const Role = require('../models/Role');
const logger = require('../tools/logger');


const getRolesController = async (req = request, res = response) => {
  try {
    const [total, roles] = await Promise.all([
      Role.countDocuments({}),
      Role.find({}, 'role')
    ]);

    logger.info('Get Roles')
    res.status(200).json({
      status: 'SUCCESS',
      total,
      roles: roles.map( obj => obj.role)
    });

  } catch (error) {
    logger.error(`error: ${ error }`)
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}

module.exports = {
  getRolesController
}