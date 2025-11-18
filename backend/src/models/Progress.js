const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
  percent: { type: Number, default: 0 }
});

module.exports = mongoose.model('Progress', progressSchema);
