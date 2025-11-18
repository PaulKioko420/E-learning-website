const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { markLessonComplete, getProgress } = require('../controllers/progressController');

router.post('/:courseId/lesson/:lessonId/complete', auth, markLessonComplete);
router.get('/:courseId', auth, getProgress);

module.exports = router;
