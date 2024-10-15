const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'participant', 'supervisor', 'peer', 'junior'], required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
  peers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the date when the question is created
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
