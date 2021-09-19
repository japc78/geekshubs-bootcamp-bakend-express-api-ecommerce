const { Schema, model } = require('mongoose');
const User = require('./User');
const LineItem = require('./LineItem');

const ShoppingCartSchema = Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: User,
    unique: true,
    required: [true, 'The user id is required.']
  },

  date: {
    type: Date,
    required: true,
    default: new Date().getTime()
  },

  lineItems: {
    type: [LineItem.schema],
    required: [true, 'There must be at minimum one product in the cart.']
  }
});

ShoppingCartSchema.methods.toJSON = function () {
  const { __v, _id, uid, ...shoppingCart } = this.toObject();
  return shoppingCart;
}

module.exports = model('ShoppingCart', ShoppingCartSchema);