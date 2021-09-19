const { request, response } = require('express');
const ShoppingCart = require('../models/ShoppingCart');

const existsShoppingCart = async (req = request, res = response, next) => {
  const { user } = req.body;

  try {
    const shoppingCart = await ShoppingCart.findOne({ uid: user.id });

    if (shoppingCart) {
      shoppingCart.date = new Date().getTime();
      req.body.shoppingCart = shoppingCart.toJSON();
    } else {
      req.body.shoppingCart = {
        uid: user.uid,
        date: new Date().getTime(),
        lineItems: []
      }
    }

    next();

  } catch (error) {
    res.status(401).json({
      status: 'FAILURE',
      message: 'Error to read the shopping cart exists Service is not available, contact with administrator',
      error
    })
  }


}

module.exports = {
  existsShoppingCart
}


