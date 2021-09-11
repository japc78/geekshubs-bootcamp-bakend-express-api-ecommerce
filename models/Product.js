
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
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

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'The category id is required']
  },

  price: {
    type: Number,
    default: 0
  },

  description: {
    type: String
  },

  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The user id is required']
  },
})

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.id = _id;
  return product;
}

module.exports = model('Product', ProductSchema);