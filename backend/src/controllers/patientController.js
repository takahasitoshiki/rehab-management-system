const Patient = require("../models/patient");

// 患者登録
exports.registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res
      .status(201)
      .json({ message: "患者情報が登録されました", patient: savedPatient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "患者情報の登録に失敗しました", details: error.message });
  }
};

// 患者情報の更新
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPatient) {
      return res
        .status(404)
        .json({ message: "患者情報が見つかりませんでした" });
    }
    res
      .status(200)
      .json({ message: "患者情報が更新されました", patient: updatedPatient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "患者情報の更新に失敗しました", details: error.message });
  }
};

// 患者一覧取得
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // 全患者情報を取得
    res.status(200).json({
      success: true,
      data: patients,
      message: "患者一覧を取得しました",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "患者情報の取得に失敗しました",
      details: error.message,
    });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "患者が見つかりませんでした" });
    }
    res.status(200).json({
      success: true,
      data: patient,
      message: "患者情報を取得しました",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "患者情報の取得に失敗しました",
      details: error.message,
    });
  }
};
