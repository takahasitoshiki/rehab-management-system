const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');
const authRoutes = require("./src/routes/authRoutes.js");
const patientRoutes = require("./src/routes/patientRoutes.js");
const dotenv = require('dotenv');

dotenv.config(); // 環境変数を読み込む

const app = express();

// CORS設定
app.use(cors({
    origin: 'http://localhost:5173', // Reactの開発サーバーURL
}));

// MongoDB に接続
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, MongoDB!");
});

// JSONを扱えるようにする
app.use(express.json());

// ルートエンドポイント
app.get('/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// ユーザーセッション関連
app.use('/api/users', authRoutes);

// 患者登録関連
app.use('/api/patients', patientRoutes);


// サーバーの起動
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});