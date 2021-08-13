const { response, request } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const authLoginController = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({email});

    if (!user) return res.status(400).json({ msg: 'Email not found in DB'});

    if (!user.state) return res.status(400).json({ msg: 'Email is not active in DB'});

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if(!isValidPassword) return res.status(400).json({ msg: 'Password is not valid'});

    res.status(200).json({
      status: 'SUCCESS',
      user
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

const authLogoutController = async (req = request, res = response) => {
  // TODO Add JWT and finish.
  const { id } = req.body
  try {
    res.status(200).json({
      status: 'SUCCESS',
      msg: `User with id: ${id} logout correctly`,
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
  authLoginController,
  authLogoutController
}