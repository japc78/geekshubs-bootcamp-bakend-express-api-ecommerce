const { validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const { errors } = result;

    return res.status(400).json({
      status: 'FAILURE',
      message: errors[0].msg,
      // message: errors,
      error: errors[0]
    });
  }

  next();
}

module.exports = {
  validFields
}