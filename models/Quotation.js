const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  participants: [
    {
      userId: String,
      fraction: Number
    }
  ],
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quotation', QuotationSchema);
