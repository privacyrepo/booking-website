const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['residential', 'commercial', 'deep cleaning', 'specialized'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
