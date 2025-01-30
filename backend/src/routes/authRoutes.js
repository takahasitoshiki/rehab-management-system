const express = require('express');
const { registerUser, loginUser, getAllUser } = require('../controllers/authController');
const router = express.Router();


// ユーザー登録
router.post('/register', registerUser);

// ユーザーログイン
router.post('/login', loginUser);

// ユーザー取得
router.get('/', getAllUser);

module.exports = router;