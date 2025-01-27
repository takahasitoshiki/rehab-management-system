const Reservation = require("../models/reservations");

// 予約登録
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const savedReservation = await reservation.save();
    res
      .status(201)
      .json({ message: "予約が作成されました。", reservation: savedReservation });
  } catch (error) {
    res
      .status(500)
      .json({ error: "予約の作成に失敗しました。", details: error.message });
  }
};


// 予約取得
// exports.getAllReservation = async (req, res) => {
//   try {
//     const reservations = await Reservation.find(); //全予約を取得
//     res
//       .status(201)
//       .json(reservations);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "予約の作成に失敗しました。" });
//   }
// };

// 予約取得
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req,params.id); //ID検索
    if(!reservation){
      return res.status(404).json({ error: "予約が見つかりません。"})
    }
    res
      .status(200)
      .json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "予約の取得に失敗しました。" });
  }
};

// 予約更新
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id, // 更新する予約のID
      req.body, // 更新内容
      { new: true } // 更新後のデータを返す
    );
    if (!updatedReservation) {
      return res.status(404).json({ error: "予約が見つかりません。" });
    }
    res.status(200).json({ message: "予約が更新されました。", updatedReservation });
  } catch (error) {
    res.status(500).json({ error: "予約の更新に失敗しました。" });
  }
};

// 予約削除
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ error: "予約が見つかりません。" });
    }
    res.status(200).json({ message: "予約が削除されました。" });
  } catch (error) {
    res.status(500).json({ error: "予約の削除に失敗しました。" });
  }
};

// 予約検索
exports.searchReservations = async (req, res) => {
  try {
    const { date, patients_code, therapist_id } = req.query; // クエリパラメータで条件を指定
    const query = {};

    if (date) query.date = date;
    if (patient_id) query.patients_code = patient_id;
    if (therapist_id) query.therapist_id = therapist_id;

    const reservations = await Reservation.find(query);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "予約の検索に失敗しました。" });
  }
};