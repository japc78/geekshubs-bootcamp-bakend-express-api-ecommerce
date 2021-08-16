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


const isTheSameEmail = async (email = '', { req } ) => {
  const { user } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists && emailExists.email === user.email) {
    throw new Error(`The email: ${email} is register for this users, please `);

  } else if (emailExists && emailExists.email !== user.email){
    throw new Error(`The email: ${email} already exists in database`);
  }
}


module.exports = {
  isValidRole,
  emailExists,
  isTheSameEmail
}