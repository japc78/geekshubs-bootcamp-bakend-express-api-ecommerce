const { response, request } = require('express');

const Category = require('../models/Category');

const getCategoriesController = async (req = request, res = response) => {
  try {

    const { user } = req.body;

    const { limit = 5 , from = 0, state = true } = req.query;
    const query = { state }
    const queryDetails = {
      fieldsToShow: 'name user',
      populate: {
        path: 'user',
        select: 'name role'
      }
    };

    if (user.role === 'USER_ROLE') {
      console.log('pass');
      queryDetails.fieldsToShow = 'name';
      queryDetails.populate = ''
    }

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query, queryDetails.fieldsToShow)
        .skip(Number(from))
        .limit(Number(limit))
        .populate(queryDetails.populate)
    ]);

    res.status(200).json({
      status: 'SUCCESS',
      total,
      categories
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}


// Add categoría
const addCategoryController = async (req = request, res = response) => {
  try {

    const { category: data} = req.body;

    data.name = data.name.toLowerCase();
    data.user = req.body.user.uid

    const category = new Category(data);

    // Save in database
    await category.save();

    res.status(201).json({
      category
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}


const updateCategoryController = async (req = request, res = response) => {
  //TODO updateCategoryController
}


const deleteCategoryController = async (req = request, res = response) => {
  //TODO deleteCategoryController
}


module.exports = {
  getCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController

}