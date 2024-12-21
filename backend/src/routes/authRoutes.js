const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();


// ユーザー登録
router.post('/register', registerUser);

// ユーザーログイン
router.post('/login', loginUser);


module.exports = router;