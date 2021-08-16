const Role = require('../models/Role');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });

  if( !existsRole) {
    throw new Error(`The role: ${role} has not find into database`);
  }
}

module.exports = {
  isValidRole
}