const { Schema, model } = require('mongoose');

const LineItemSchema = Schema({

  productId: {
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
    require: [true, 'You must enter a actual price of this product']
  }
})

LineItemSchema.virtual('total')
  .get(function () {
    return this.quantity * this.price;
  })

LineItemSchema.set('toObject', { virtuals: true });
LineItemSchema.set('toJSON', { virtuals: true });

LineItemSchema.methods.toJSON = function () {
  const { __v, _id, ...lineItem } = this.toObject();
  return lineItem;
}

module.exports = model('LineItem', LineItemSchema);