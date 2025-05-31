const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const { auth } = require('../middleware/authMiddleware');


router.post('/join', auth, quotationController.joinQuotation);

module.exports = router;
