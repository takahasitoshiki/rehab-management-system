// 確認用
// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  const { reservations } = req.body;

  if (!Array.isArray(reservations)) {
    return res.status(400).json({ message: "予約データが不正です" });
  }

  console.log("受信した実績データ:", reservations);

  // フロントに成功を返す
  res.status(200).json({ message: "実績受信完了", count: reservations.length });
});

module.exports = router;