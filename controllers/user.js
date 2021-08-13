const { response, request } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const getUserController = async (req = request, res = response) => {
  const { limit = 5, from = 0, state = true } = req.query;

  const query = { state };

  try {
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query, 'name email role')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
      status: 'SUCCESS',
      total,
      users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}

const addUserController = async (req = request, res = response) => {
  try {
    const { userData } = req.body;
    const user = new User(userData);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(userData.password, salt);

    await user.save();

    res.status(200).json({
      status: 'SUCCESS',
      user
    });

  } catch (error) {
    console.error('error', error);

    res.status(500).json({
      status: 'FAILURE',
      error: {
        code: error.code,
        message: error.message
      }
    })
  }
}

module.exports = {
  getUserController,
  addUserController
}