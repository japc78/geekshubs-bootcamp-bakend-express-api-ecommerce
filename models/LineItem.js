const { Schema, model } = require('mongoose');

const LineItemSchema = Schema({

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'The product id is required']
  },

  quantity: {
    type: Number,
    require: [true, 'You must enter a quantity of this product']
  },

  price: {
    type: Number,
    default: 0
  }
})

module.exports = model('LineItem', LineItemSchema);