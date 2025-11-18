const Course = require('../models/Course');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category, published } = req.body;
    const instructorId = req.user.id;
    let thumbnailUrl = null;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: 'elearning/thumbnails' });
      thumbnailUrl = upload.secure_url;
    }
    const course = await Course.create({ title, description, price, category, published, instructor: instructorId, thumbnailUrl });
    res.status(201).json({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listCourses = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') } ];
    const courses = await Course.find(filter).skip((page-1)*limit).limit(parseInt(limit)).populate('instructor', 'name');
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const updates = req.body;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: 'elearning/thumbnails' });
      updates.thumbnailUrl = upload.secure_url;
    }
    Object.assign(course, updates);
    await course.save();
    res.json({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await course.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const { title, content, order } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    let videoUrl = null;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: 'elearning/videos', resource_type: 'video' });
      videoUrl = upload.secure_url;
    }
    const lesson = { title, content, videoUrl, order };
    course.lessons.push(lesson);
    await course.save();
    res.status(201).json({ lesson: course.lessons[course.lessons.length-1] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
