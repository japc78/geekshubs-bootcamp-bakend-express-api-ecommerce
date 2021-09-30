const { response, request } = require('express');
const ShoppingCart = require('../models/ShoppingCart');
const logger = require('../tools/logger');

const getShoppingCartController = async (req = request, res = response) => {
  const {uid} = req.body.user;

  try {

    const shoppingCart = await ShoppingCart.findOne({ uid });

    logger.info(`UserId: ${ req.body.user.uid }`)
    res.status(200).json({
      status: 'SUCCESS',
      shoppingCart
    });

  } catch (error) {
    logger.error(`UserId: ${ req.body.user.uid }`)
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}

const updateShoppingCartController = async (req = request, res = response) => {
  const { shoppingCart,  user } = req.body;
  try {
    let sc = await ShoppingCart.findOne({ uid: user.uid });

    if (sc) {
      shoppingCart.date = new Date().getTime();
      sc = await ShoppingCart.findOneAndUpdate({uid: user.uid}, shoppingCart, {new: true});
    } else {
      shoppingCart.uid = user.uid;
      sc = await ShoppingCart.create(shoppingCart);
    }

    logger.info(`UserId: ${ req.body.user.uid }`)
    res.status(200).json({
      status: 'SUCCESS',
      shoppingCart: sc
    });

  } catch (error) {
    logger.error(`UserId: ${ req.body.user.uid }`)
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}

module.exports = {
  getShoppingCartController,
  updateShoppingCartController
}