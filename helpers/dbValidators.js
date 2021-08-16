const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    throw new Error(`The role: ${role} has not find into database`);
  }
}


const emailExists = async (email = '') => {
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error(`The email: ${email} already exists in database`);
  }
}

module.exports = {
  isValidRole,
  emailExists
}