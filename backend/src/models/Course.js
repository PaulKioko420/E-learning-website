const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  videoUrl: String,
  duration: Number,
  order: Number,
  quiz: [{
    question: String,
    options: [String],
    correctIndex: Number
  }]
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  lessons: [lessonSchema],
  thumbnailUrl: String,
  published: { type: Boolean, default: false },
  studentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
