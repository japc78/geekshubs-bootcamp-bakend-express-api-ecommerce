const { Schema, model } = require('mongoose');
const { LineItemSchema } = require('./LineItem');
const User = require('./User');

const ShoppingCartSchema = Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: [true, 'The user id is required.']
  },

  date: {
    type: Date,
    required: true,
    default: new Date().getTime()
  },

  lineItems: {
    type: [LineItemSchema],
    required: [true, 'There must be at minimum one product in the cart.']
  }
})

module.exports = model('ShoppingCart', ShoppingCartSchema);