const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const { ViewParticipant, submitAppraisal } = require('../controller/appraisal');

// Protect appraisal submission
router.post('/submit', verifyToken, checkRole(['supervisor', 'peer', 'junior', 'participant']), submitAppraisal);

router.get('/view/:participantId', verifyToken, checkRole(['supervisor', 'peer', 'junior', 'participant']), ViewParticipant);

module.exports = router;
