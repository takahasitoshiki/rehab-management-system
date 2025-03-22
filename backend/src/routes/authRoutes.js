const express = require('express');
const { registerUser, loginUser, getAllUser, logoutUser } = require('../controllers/authController');
const router = express.Router();


// ユーザー登録
router.post('/register', registerUser);

// ユーザーログイン
router.post('/login', loginUser);

// ユーザー取得
router.get('/all', getAllUser);

// ユーザーログアウト
router.post('/logout', logoutUser);

module.exports = router;