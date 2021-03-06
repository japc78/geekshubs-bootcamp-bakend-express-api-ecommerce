const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },

  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'The password is required'],
  },

  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },

  state: {
    type: Boolean,
    default: true
  }
})


// Se filtra la salida del Objeto (se ignora password, __v )
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}


module.exports = model('User', UserSchema);