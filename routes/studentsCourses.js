const express = require('express');
const router = express.Router();

const studentsCoursesHandler = require('./handler/studentsCoursesHandler');
//const verifyToken = require('../middlewares/verifyToken');

router.post('/', studentsCoursesHandler.create);
router.get('/', studentsCoursesHandler.getStudentCourses);

module.exports = router;


