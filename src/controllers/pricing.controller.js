const Pricing = require('../models/pricing.model');
const Bundle = require('../models/bundle.model');
const Service = require('../models/service.model');
const httpStatusCodes = require('http-status-codes');

exports.calculatePrice = async (req, res) => {
  try {
    const { requestedServices, bundleName } = req.body;
    let totalPrice = 0;
    
    if (bundleName) {
      const bundle = await Bundle.findOne({ name: bundleName }).populate('services');
      if (!bundle) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ message: 'Bundle not found' });
      }
      for (let service of bundle.services) {
        const pricing = await Pricing.findOne({ serviceId: service._id });
        totalPrice += pricing.basePrice * (1 - bundle.discountRate);
      }
    } else {
      for (let serviceId of requestedServices) {
        const pricing = await Pricing.findOne({ serviceId });
        if (!pricing) {
          continue;
        }
        totalPrice += pricing.basePrice;
      }
    }

    return res.status(httpStatusCodes.OK).json({ estimatedPrice: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error calculating price' });
  }
};
