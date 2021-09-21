const { response, request } = require('express');

const Category = require('../models/Category');
const logger = require('../tools/logger');

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

    logger.info(`UserId: ${user.uid}`)
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

    logger.info(`UserId: ${ req.body.user.uid }`)
    res.status(201).json({
      category
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


const updateCategoryController = async (req = request, res = response) => {
  const { id } = req.params
  const { category } = req.body;

  try {
    const categoryUpdated = await Category.findByIdAndUpdate(id, category, {new: true});

    logger.info(`UserId: ${ req.body.user.uid }`)
    res.status(200).json({
      status: 'SUCCESS',
      category: categoryUpdated
    });

  } catch (error) {
    logger.error(`UserId: ${ req.body.user.uid }`)
    res.status(500).json({
      status: 'FAILURE',
      error: {
        code: error.code,
        message: error.message
      }
    });
  }
}


const deleteCategoryController = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if(!category) {
      throw new Error(`The category with id: ${ id} has not been found`)
    }

    logger.info(`UserId: ${ req.body.user.uid }`)
    res.status(200).json({
      status: 'SUCCESS',
      message: 'The category has been delete on database',
      category
    });

  } catch (error) {
    logger.error(`UserId: ${ req.body.user.uid }`)
    res.status(500).json({
      status: 'FAILURE',
      error: {
        code: error.code,
        message: error.message
      }
    });
  }
}


module.exports = {
  getCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController
}