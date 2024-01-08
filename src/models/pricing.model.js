const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  extraOptions: [{
    name: String,
    additionalCost: Number
  }]
}, {
  timestamps: true
});

const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = Pricing;
