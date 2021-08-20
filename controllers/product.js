const { response, request } = require('express');

const Product = require('../models/Product');


const getProductController = async (req = request, res = response) => {
  try {
    const { limit = 5, from = 0, state = true } = req.query;

    const query = { state }

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query, 'name category seller price')
        .skip(Number(from)) // desde donde se muestran los resultados
        .limit(Number(limit)) // Limite 5
        .populate({
          path: 'seller',
          select: 'name',
        })
        .populate({
          path: 'category',
          select: 'name'
        })
    ]);

    res.status(200).json({
      status: 'SUCCESS',
      total,
      products
    })

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}


const addProductController = async (req = request, res = response) => {
  try {
    const { data, user } = req.body;

    data.name = data.name.toUpperCase();
    data.seller = user.uid;

    const product = await Product.create(data);

    res.status(200).json({
      status: 'SUCCESS',
      product
    })

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}


const updateProductController = async (req = request, res = response) => {
  // TODO updateProductController
  res.status(200).json({
    status: 'SUCCESS'
  });
}


const deleteProductController = async (req = request, res = response) => {
  // TODO deleteProductController
  res.status(200).json({
    status: 'SUCCESS'
  });
}



module.exports = {
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController
}