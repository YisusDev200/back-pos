const express = require('express');
const router = express.Router();
const productKeyController = require('../controllers/productKeyController');

router.post('/generate-product-key', productKeyController.generateProductKey);
router.post('/validate-product-key', productKeyController.validateProductKey);

module.exports = router;