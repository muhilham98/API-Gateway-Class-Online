const express = require('express');
const router = express.Router();

const reviewsHandler = require('./handler/reviewsHandler');
const tokenVerification = require('../middlewares/tokenVerification');

router.post('/', tokenVerification, reviewsHandler.create);
router.get('/', reviewsHandler.getReviews);
router.put('/:id', tokenVerification, reviewsHandler.update);
router.delete('/:id', tokenVerification, reviewsHandler.delete);



module.exports = router;
