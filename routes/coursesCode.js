const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/coursesHandler');
const tokenVerification = require('../middlewares/tokenVerification');

router.get('/', coursesHandler.getAllCoursesCode);
router.put('/:id', coursesHandler.updateCoursesCode);

module.exports = router;
