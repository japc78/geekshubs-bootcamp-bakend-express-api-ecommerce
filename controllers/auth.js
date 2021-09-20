const { response, request } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const UserSession = require('../models/UserSession');
const { jwtGenerator } = require('../helpers/jwt-generator');
const ShoppingCart = require('../models/ShoppingCart');
const logger = require('../tools/logger');


const authLoginController = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      const msg = 'Email not found in DB'
      logger.error(`User login: ${email}, ${msg}`);
      return res.status(400).json({ msg })
    }

    if (!user.state) {
      const msg = 'Email is not active in DB'
      logger.error(`User login: ${email}, ${msg}`);
      return res.status(400).json({ msg });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if(!isValidPassword) return res.status(400).json({ msg: 'Password is not valid'});

    // Generar el JWT
    const token = await jwtGenerator(user.id);

    const session = {
      uid: user.id,
      token
    }

    const result = await UserSession.findOneAndUpdate({uid: user.id}, {token});

    if (!result) {
      const userSession = new UserSession(session);
      await userSession.save();
    }

    const shoppingCart = await ShoppingCart.findOne({uid: user.id});
    logger.info(`User login: ${user.id}`);

    res.status(200).json({
      status: 'SUCCESS',
      user,
      shoppingCart,
      token
    });

  } catch (error) {
    logger.error(`User login: ${email}, ${error}`);
    res.status(500).json({
      status: 'FAILURE',
      error: error.message
    });
  }
}


const authLogoutController = async (req = request, res = response) => {
  const { uid } = req.body.user;

  try {
    await UserSession.deleteOne({ uid }, (error, result)=> {
      if (error) throw error;

      if (result.deletedCount === 0) {
        res.status(500).json({
          status: 'FAILURE',
          message: 'Unable to complete the operation, please try again later, if the problem persists, please contact the Administrator.'
        })

      } else {
        res.status(200).json({
          status: 'SUCCESS',
          message: `User with id: ${uid} logout correctly`
        });
      }
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