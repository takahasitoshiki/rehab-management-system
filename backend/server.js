const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // 環境変数を読み込む

const app = express();

// CORS設定
app.use(cors({
    origin: 'http://localhost:5173', // Reactの開発サーバーURL
}));

// JSONを扱えるようにする
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// サーバーの起動
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});