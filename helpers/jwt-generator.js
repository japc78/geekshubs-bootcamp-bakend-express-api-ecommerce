const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '1h', algorithm: 'HS512' },
      (error, token) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

module.exports = {
  jwtGenerator
}