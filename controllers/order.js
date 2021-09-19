const { response, request } = require('express');
const Order = require('../models/Order');
const ShoppingCart = require('../models/ShoppingCart');

const getOrdersController = async (req = request, res = response) => {
  const { uid } = req.body.user;

  try {
    const orders = await Order.find({ uid });

    // console.log(shoppingCart);
    res.status(200).json({
      status: 'SUCCESS',
      orders
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}

const addOrderCartController = async (req = request, res = response) => {
  const { shoppingCart,  user } = req.body;

  console.log(shoppingCart);
  const { uid } = user;
  const { lineItems } = shoppingCart
  try {
    let sc = await ShoppingCart.findOne({ uid });

    if (!sc) {
      res.status(500).json({
        status: 'FAILURE',
        message: 'Error, the shopping cart is not correct, check the products and try again.'
      });
    }

    const data = {
      uid: user.uid,
      lineItems
    };

    const result = await ShoppingCart.findOneAndDelete({ uid: user.uid});

    if (!result) {
      res.status(500).json({
        status: 'FAILURE',
        message: 'Error, Unable to order, please check your cart and try again.'
      });
    }

    const order = await Order.create(data);

    res.status(200).json({
      status: 'SUCCESS',
      order
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
  getOrdersController,
  addOrderCartController
}