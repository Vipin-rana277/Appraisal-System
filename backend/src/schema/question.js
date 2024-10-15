const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for an appraisal question
const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true, // Question text is required
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the date when the question is created
  }
});

// Create and export the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
