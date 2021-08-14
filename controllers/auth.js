const { response, request } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const UserSession = require('../models/UserSession');
const { jwtGenerator } = require('../helpers/jwt-generator');

const authLoginController = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({email});

    if (!user) return res.status(400).json({ msg: 'Email not found in DB'});

    if (!user.state) return res.status(400).json({ msg: 'Email is not active in DB'});

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if(!isValidPassword) return res.status(400).json({ msg: 'Password is not valid'});

    // Generar el JWT
    const token = await jwtGenerator(user.id);

    const session = {
      uid: user.id,
      token
    }

    const userSession = new UserSession(session);
    await userSession.save();

    res.status(200).json({
      status: 'SUCCESS',
      user,
      token
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({
      status: 'FAILURE',
      error: error.message
    });
  }
}

const authLogoutController = async (req = request, res = response) => {
  // TODO Add JWT and finish.
  const { uid } = req.body;

  try {
    await UserSession.deleteMany({ uid }, (error, data)=> {
      if (error) throw error;

      res.status(200).json({
        status: 'SUCCESS',
        msg: `User with id: ${uid} logout correctly`
      });
    })

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