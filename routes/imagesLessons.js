const express = require('express');
const router = express.Router();

const imagesLessonsHandler = require('./handler/imagesLessonsHandler');
//const verifyToken = require('../middlewares/verifyToken');

router.post('/', imagesLessonsHandler.create);
router.put('/:id', imagesLessonsHandler.update);
router.delete('/:id', imagesLessonsHandler.delete);


module.exports = router;
