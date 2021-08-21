const Role = require('../models/Role');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

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


const categoryNameExits = async (name = '') => {
  name = name.toLowerCase();
  const categoryNameExits = await Category.findOne({ name });

  if (categoryNameExits) {
    throw new Error(`The name: ${name} already exits in Database`);
  }
}


const categoryExitsById = async (id = '') => {
  const categoryExits = await Category.findById(id);

  if (!categoryExits) {
    throw new Error(`The category id: ${id}, It is not register in Database`);
  }
}


const productNameExits = async (name = '') => {
  name = name.toLowerCase();
  const productNameExits = await Product.findOne({ name });

  if (!productNameExits) {
    throw new Error(`The product name: ${name}, it already exits in Database`);
  }
}


module.exports = {
  isValidRole,
  emailExists,
  isTheSameEmail,
  categoryNameExits,
  categoryExitsById,
  productNameExits,
}