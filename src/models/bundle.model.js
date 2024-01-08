const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  discountRate: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = Bundle;
