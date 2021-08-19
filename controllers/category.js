const { response, request } = require('express');

const Category = require('../models/Category');

const getCategoriesController = async (req = request, res = response) => {
  try {
    const { limit = 5 , from = 0, state = true } = req.query;
    const query = { state }

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query, 'name')
        .skip(Number(from))
        .limit(Number(limit))
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
    const data = {
      name: req.body.category.name,
      user: req.body.user.uid
    }

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