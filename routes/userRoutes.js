const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getAllUsers);

module.exports = router;
