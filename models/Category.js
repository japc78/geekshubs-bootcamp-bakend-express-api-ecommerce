
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true
  },

  state: {
    type: Boolean,
    default: true,
    required: [true, 'The state is required']
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The user id is required']
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.id = _id;
  return category;
}

module.exports = model('Category', CategorySchema);