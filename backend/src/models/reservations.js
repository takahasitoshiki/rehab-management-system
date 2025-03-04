const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  patient_code: { type: String, required: true },
  therapist_id: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  rehabilitation_details: { type: String, default: "" },
});

module.exports = mongoose.model("reservation", ReservationSchema);
