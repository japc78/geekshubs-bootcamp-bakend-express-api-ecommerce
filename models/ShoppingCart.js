const { Schema, model } = require('mongoose');
const LineItem = require('./LineItem');
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
    type: [LineItem],
    required: [true, 'There must be at minimum one product in the cart.']
  }
})

module.exports = model('ShoppingCart', ShoppingCartSchema);