const { request, response } = require('express')

const isAdminRole = (req = request, res = response, next) => {
  if (!req.body.user) {
    return res.status(401).json({
      status: 'FAILURE',
      message: 'Is necessary to valid the token first'
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


const shouldBeRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.body.user) {
      return res.status(500).json({
        status: 'FAILURE',
        message: 'Is necessary to valid the token first'
      });
    }

    const { role, name } = req.body.user;
    if (!roles.includes(role)) return res.status(401).json({
      status: 'FAILURE',
      message: `The user: ${name} has not authorized role.`
    });

    next();
  }
}

module.exports = {
  isAdminRole,
  shouldBeRole
}