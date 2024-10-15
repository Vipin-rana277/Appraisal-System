const { addUserController, mapUsersController } = require('../controller/admin');
const { verifyToken, checkRole } = require('../middleware/auth');
const express = require('express');

const router = express.Router();

// Protect admin routes
router.post('/add-user', verifyToken, checkRole(['admin']), addUserController);

router.post('/map-users', verifyToken, checkRole(['admin']), mapUsersController);

module.exports = router;




