const { response, request } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');


const getUserController = async (req = request, res = response) => {
  const { limit = 5, from = 0, state = true } = req.query;

  const query = { state };

  try {
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query, 'name email role')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
      status: 'SUCCESS',
      total,
      users
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      message: 'Error: Service is not available, contact with administrator',
      error
    });
  }
}


const addUserController = async (req = request, res = response) => {
  try {
    const user = new User(req.body.user);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();

    res.status(200).json({
      status: 'SUCCESS',
      user
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      error: {
        code: error.code,
        message: error.message
      }
    })
  }
}


const updateUserController = async (req = request, res = response) => {
  const { user, data } = req.body

  try {
    const userUpdated = await User.findByIdAndUpdate(user.uid, data, { new: true })

    res.status(200).json({
      status: 'SUCCESS',
      user: userUpdated
    });

  } catch (error) {
    res.status(500).json({
      status: 'FAILURE',
      error: {
        code: error.code,
        message: error.message
      }
    });
  }
}


const deleteUserController = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id }, (err)=> {
      if (err) throw err;
      res.status(200).json({
        status: 'SUCCESS',
        msg: `User with id: ${id} delete on database`
      });
    })

  } catch (error) {
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
  getUserController,
  addUserController,
  updateUserController,
  deleteUserController
}