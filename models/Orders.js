const { Schema, model } = require('mongoose');
const User = require('./User');
const LineItem = require('./LineItem');

const OrderSchema = Schema({
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
    type: [LineItem.schema],
    required: [true, 'There must be at minimum one product in the order.']
  }
});

OrderSchema.virtual('total').get(function () {
  let total = 0;

  this.lineItems.forEach(item => {
    total += item.total;
  });

  return total;
})

OrderSchema.methods.toJSON = function () {
  const { __v, _id, uid, ...shoppingCart } = this.toObject();
  return shoppingCart;
}

module.exports = model('Order', OrderSchema);

