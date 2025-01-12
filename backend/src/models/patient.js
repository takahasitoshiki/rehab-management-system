const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patients_code: {
      type: String,
      required: true,
    },
    patients_name: {
      type: String,
      required: true,
    },
    disease_name: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["1", "2"], // "1" = 男性, "2" = 女性
    },
    registration_date: {
      type: String,
      required: true,
    },
    treatment_plan: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
