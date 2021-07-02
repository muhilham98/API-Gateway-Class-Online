const express = require('express');
const router = express.Router();

const lessonsHandler = require('./handler/lessonsHandler');
//const verifyToken = require('../middlewares/verifyToken');

router.post('/', lessonsHandler.create);
router.put('/:id', lessonsHandler.update);
router.get('/', lessonsHandler.getAlllessons);
router.get('/:id', lessonsHandler.getlesson);
router.delete('/:id', lessonsHandler.delete);

module.exports = router;
