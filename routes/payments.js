const express = require('express');
const router = express.Router();

const paymentsHandler = require('./handler/paymentsHandler');
const tokenVerification = require('../middlewares/tokenVerification');

router.post('/', paymentsHandler.createPayment);
router.get('/', tokenVerification, paymentsHandler.getAllPayments);

module.exports = router;
