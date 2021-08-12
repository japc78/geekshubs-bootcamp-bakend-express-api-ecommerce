const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

const dbConnection = async () => {
  mongoose.connect(process.env.MONGODB_CONNECTION, options, (error) => {
    if (error)
      throw new Error(error);

    console.log('The connection to the database is ok');
  })
}

module.exports = dbConnection;