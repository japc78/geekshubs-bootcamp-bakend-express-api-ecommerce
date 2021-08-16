const { Schema, model } = require('mongoose');


const UserSessionSchema = new Schema({
  uid: {
    type: String,
    required: [true, 'The uid is required'],
    unique: true
  },

  token: {
    type: String,
    required: [true, 'The token is required'],
    unique: true
  }
})


module.exports = model('UserSession', UserSessionSchema);