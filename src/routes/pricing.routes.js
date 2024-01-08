const express = require('express');
const PricingController = require('../controllers/pricing.controller');
const router = express.Router();

router.post('/calculate', PricingController.calculatePrice);

module.exports = router;
