const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const { auth, isFornecedor } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getProducts);
router.post('/', auth, isFornecedor, createProduct);

module.exports = router;
