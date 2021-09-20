const { response, request } = require('express');
const Order = require('../models/Order');
const ShoppingCart = require('../models/ShoppingCart');

const getOrdersController = async (req = request, res = response) => {
  const { limit = 5, from = 0, sort='desc', _id, uid } = req.query;

  const prepareQuery = () => {
    const query = {};
    if (_id) query._id = _id;
    if (uid) query.uid = uid;

    return query;
  }

  const query = prepareQuery();

  try {
    const [ total, orders ] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query)
        .skip(Number(from)) // desde donde se muestran los resultados
        .limit(Number(limit)) // Limite 5
        .populate({
          path: 'uid',
          select: 'uid email role',
        })
        .sort({'date': sort})
    ]);

    // console.log(shoppingCart);
    res.status(200).json({
      status: 'SUCCESS',
      total,
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


const getUserOrdersController = async (req = request, res = response) => {
  const { uid } = req.body.user;
  const { limit = 5, from = 0, sort='desc' } = req.query;
  const query = { uid }

  try {
    const [ total, orders ] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query)
        .skip(Number(from)) // desde donde se muestran los resultados
        .limit(Number(limit)) // Limite 5
        .sort({'date': sort})
    ]);

    // console.log(shoppingCart);
    res.status(200).json({
      status: 'SUCCESS',
      total,
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

const addOrderController = async (req = request, res = response) => {
  const { shoppingCart,  user } = req.body;

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


const updateOrderController = async (req = request, res = response) => {
  const { data } = req.body;

  try {
    const order = await Order.findOneAndUpdate({ _id: data.id }, data, { new: true } );

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
  addOrderController,
  getUserOrdersController,
  updateOrderController
}