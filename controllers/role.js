const { response, request } = require('express');

const Role = require('../models/Role');


const getRolesController = async (req = request, res = response) => {
  try {
    const [total, roles] = await Promise.all([
      Role.countDocuments({}),
      Role.find({}, 'role')
    ]);

    res.status(200).json({
      status: 'SUCCESS',
      total,
      roles: roles.map( obj => obj.role)
    });

  } catch (error) {
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