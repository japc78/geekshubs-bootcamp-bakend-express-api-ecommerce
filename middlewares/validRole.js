const { request, response } = require('express')

const isAdminRole = (req = request, res = response, next) => {
  if (!req.body.user) {
    return res.status(401).json({
      status: 'FAILURE',
      message: 'Is necessary to valid the toke first'
    });
  }

  const { role, uid } = req.body.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      status: 'FAILURE',
      message: `The user with id: ${uid} has not Admin role`
    });
  }

  next();
}

module.exports = {
  isAdminRole
}