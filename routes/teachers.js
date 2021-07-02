const express = require('express');
const router = express.Router();

const teachersHandler = require('./handler/teachersHandler');

// router.get('/', teachersHandler.getAllTeachers);
router.get('/', teachersHandler.getTeacherCourses);
router.get('/all', teachersHandler.getAllTeachersCourses);
router.post('/', teachersHandler.create);
// router.put('/:id', teachersHandler.update);
router.delete('/:id', teachersHandler.delete);



module.exports = router;
