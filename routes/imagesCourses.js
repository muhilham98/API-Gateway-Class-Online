const express = require('express');
const router = express.Router();

const imagesCoursesHandler = require('./handler/imagesCoursesHandler');
//const verifyToken = require('../middlewares/verifyToken');

router.post('/', imagesCoursesHandler.create);
router.put('/:id', imagesCoursesHandler.update);
router.delete('/:id', imagesCoursesHandler.delete);

module.exports = router;
