const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserSession = require('../models/UserSession');


const validJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) return res.status(401).json({
    status: 'FAILURE',
    message: 'There is not token in the request'
  });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    const user = await User.findById(uid);
    const userSession = await UserSession.findOne({uid});

    if (!user || !userSession) return res.status(401).json({
      status: 'FAILURE',
      message: 'Token is not valid - User is not exist in Database'
    });

    // Verifica que el user tiene state=true
    if (!user.state) return res.status(401).json({
      status: 'FAILURE',
      message: 'Token is not valid - user disabled'
    });

    req.body.uid = user._id;
    next();

  } catch (error) {
    res.status(401).json({
      status: 'FAILURE',
      message: 'Token is not valid',
      error
    });
  }
}


module.exports = {
  validJWT
}