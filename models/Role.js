
const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role is required'],
    unique: true
  }
})


module.exports = model('Role', RoleSchema);