const express = require('express');
const productController = require('../controllers/productController');
const { auth, isFornecedor } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, productController.getProducts);

router.post('/', auth, isFornecedor, productController.createProduct);

router.get('/:id', auth, productController.getProductById);

router.put('/:id', auth, isFornecedor, productController.updateProduct);

router.delete('/:id', auth, isFornecedor, productController.deleteProduct);

module.exports = router;
