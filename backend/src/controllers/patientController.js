const Patient = require("../models/patient");

// 患者登録
exports.registerPatient = async (req, res) => {
  try {
    // 最新の患者コードを入手
    const lastPatient = await Patient.findOne({}, "patients_code")
      .sort({ patients_code: -1 })
      .lean();
    console.log("latest patient code:", lastPatient.patients_code);

    // patients_codeの処理
    let newCode =
      lastPatient && lastPatient.patients_code
        ? parseInt(lastPatient.patients_code.replace("PA", ""), 10) + 1
        : 1;

    if (Number.isNaN(newCode)) {
      console.warn(
        "⚠ patients_code の取得に失敗しました。デフォルトの 'PA001' を使用します。"
      );
      newCode = 1; // 変数名を合わせる
    }

    const nextPatientCode = `PA${String(newCode).padStart(3, "0")}`;

    // 🔹 患者コードの重複チェック
    const existingPatient = await Patient.findOne({
      patients_code: nextPatientCode,
    });
    if (existingPatient) {
      return res.status(400).json({ message: "患者コードが重複しています" });
    }

    // 4. リクエストボディからデータを受け取り、患者情報を作成
    const {
      patients_name,
      disease_name,
      classification,
      date_of_birth,
      gender,
      registration_date,
      treatment_plan,
      note,
    } = req.body;

    const newPatient = new Patient({
      patients_code: nextPatientCode,
      patients_name,
      disease_name,
      classification,
      date_of_birth,
      gender,
      registration_date,
      treatment_plan,
      note,
    });

    const savedPatient = await newPatient.save();
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
