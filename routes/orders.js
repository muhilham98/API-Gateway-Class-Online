const express = require('express');
const router = express.Router();

const ordersHandler = require('./handler/ordersHandler');
//const verifyToken = require('../middlewares/verifyToken');

router.get('/', ordersHandler.getOrders);
router.get('/all-orders', ordersHandler.getAllOrders);

module.exports = router;
