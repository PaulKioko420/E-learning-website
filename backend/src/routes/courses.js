const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createCourse, listCourses, getCourse, updateCourse, deleteCourse, addLesson } = require('../controllers/courseController');

router.get('/', listCourses);
router.get('/:id', getCourse);
router.post('/', auth, role('instructor'), upload.single('thumbnail'), createCourse);
router.put('/:id', auth, role('instructor'), upload.single('thumbnail'), updateCourse);
router.delete('/:id', auth, role('instructor'), deleteCourse);
router.post('/:id/lessons', auth, role('instructor'), upload.single('video'), addLesson);

module.exports = router;
