const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appraisalFormSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filledBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['self', 'supervisor', 'peer', 'junior'], required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
      answer: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the date when the question is created
  }
});

const AppraisalForm = mongoose.model('AppraisalForm', appraisalFormSchema);
module.exports = AppraisalForm;
