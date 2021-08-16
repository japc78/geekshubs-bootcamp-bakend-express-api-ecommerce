const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role is required'],
    unique: true
  }
})

// Se filtra la salida del Objeto (se ignora password, __v )
RoleSchema.methods.toJSON = function () {
  const { __v, _id, ...role } = this.toObject();
  role.id = _id;
  return role;
}


module.exports = model('Role', RoleSchema);