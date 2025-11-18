const Progress = require('../models/Progress');
const Course = require('../models/Course');

exports.markLessonComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId } = req.params;
    let prog = await Progress.findOne({ user: userId, course: courseId });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!prog) {
      prog = await Progress.create({ user: userId, course: courseId, completedLessons: [lessonId] });
    } else {
      if (!prog.completedLessons.includes(lessonId)) prog.completedLessons.push(lessonId);
    }
    prog.percent = Math.round((prog.completedLessons.length / course.lessons.length) * 100);
    await prog.save();
    res.json({ progress: prog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const prog = await Progress.findOne({ user: userId, course: courseId });
    res.json({ progress: prog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
