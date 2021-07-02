const express = require('express');
const router = express.Router();

const chaptersHandler = require('./handler/chaptersHandler');
const tokenVerification = require('../middlewares/tokenVerification');

router.post('/', chaptersHandler.create);
router.put('/:id', chaptersHandler.update);
router.get('/', chaptersHandler.getAllChapters);
router.get('/:id', chaptersHandler.getChapter);
router.delete('/:id', chaptersHandler.delete);


module.exports = router;
