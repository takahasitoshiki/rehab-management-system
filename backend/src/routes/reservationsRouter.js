const express = require('express');
const {
    createReservation,
    getAllReservations,
    getReservationById,
    searchReservations,
    updateReservation,
    deleteReservation,
    completedReservations
  } = require("../controllers/reservationsController");

const router = express.Router();

// 予約作成
router.post("/", createReservation);

// 予約検索
router.get("/", getAllReservations);

// 予約条件検索
router.get("/search", searchReservations);

// 予約更新
router.put("/:id", updateReservation);

// 予約削除
router.delete("/:id", deleteReservation);

// 完了した予約のみを取得する
router.get("/completed", completedReservations);

// 予約ID検索
router.get("/:id", getReservationById);

module.exports = router;