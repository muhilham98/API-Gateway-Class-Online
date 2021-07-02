const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/coursesHandler');
const tokenVerification = require('../middlewares/tokenVerification');

router.post('/', tokenVerification, coursesHandler.create);
router.put('/:id', tokenVerification, coursesHandler.update);
router.get('/', coursesHandler.getAllCourses);
router.get('/:id', coursesHandler.getCourse);
router.delete('/:id', tokenVerification, coursesHandler.delete);

module.exports = router;
