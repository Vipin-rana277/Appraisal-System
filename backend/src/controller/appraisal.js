const AppraisalForm = require('../schema/appraisalForm');

// Submit an appraisal form
const submitAppraisal = async (req, res) => {
  const { participantId, answers, role } = req.body;

  try {
    const newAppraisalForm = new AppraisalForm({
      participant: participantId,
      filledBy: req.user._id, // Assuming user is identified through middleware
      role,
      answers
    });

    await newAppraisalForm.save();
    res.status(201).json({ message: 'Appraisal form submitted successfully', appraisalForm: newAppraisalForm });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting appraisal form', error });
  }
};

const ViewParticipant = async (req, res) => {
    const { participantId } = req.params;
    const role=req.role
    const { userId } = req.user;
  
    try {
      let appraisalForms;
  
      if (role === 'admin') {
        appraisalForms = await AppraisalForm.find({ participant: participantId }).populate('filledBy', 'name email');
      }
  
      else if (role === 'supervisor') {
        appraisalForms = await AppraisalForm.find({
          participant: participantId,
          $or: [{ filledBy: userId }, { role: 'self' }]
        }).populate('filledBy', 'name email');
      }
  
      else {
        appraisalForms = await AppraisalForm.find({
          participant: participantId,
          filledBy: userId
        }).populate('filledBy', 'name email');
      }
  
      if (!appraisalForms) {
        return res.status(404).json({ message: 'No appraisal forms found' });
      }
  
      res.status(200).json(appraisalForms);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appraisal forms', error });
    }
  };
  

module.exports = {
  submitAppraisal,
  ViewParticipant
};
