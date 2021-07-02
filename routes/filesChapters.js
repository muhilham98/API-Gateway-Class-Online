const express = require('express');
const router = express.Router();

const filesChaptersHandler = require('./handler/filesChaptersHandler');

router.post('/', filesChaptersHandler.create);
router.put('/:id', filesChaptersHandler.update);
router.get('/', filesChaptersHandler.getAllfiles);
router.get('/:id', filesChaptersHandler.getfile);
router.delete('/:id', filesChaptersHandler.delete);

module.exports = router;
