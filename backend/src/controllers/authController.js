const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid"); // ✅ 一意な ID を生成するために追加
const token = "トークン文字列";
const decoded = jwt.decode(token);
console.log("デコードされた JWT:", decoded);

// ユーザー登録
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 🔹 最新の therapist_id を取得
    const lastUser = await User.findOne({}, "therapist_id")
      .sort({ therapist_id: -1 })
      .lean();
    // 🔹 therapist_id の処理
    let newId = lastUser && lastUser.therapist_id
      ? parseInt(lastUser.therapist_id.replace("PT", ""), 10) + 1
      : 1;

    if (Number.isNaN(newId)) {
      console.warn("⚠ therapist_id の取得に失敗しました。デフォルトの 'PT001' を使用します。");
      newId = 1;
    }

    const nextTherapistId = `PT${String(newId).padStart(3, "0")}`;

    // 🔹 ユーザー名の重複チェック
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "このユーザー名は既に登録されています。" });
    }

    // 🔹 入力データのバリデーション
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "全てのフィールドを入力してください。" });
    }

    // 🔹 ユーザー作成
    const newUser = new User({
      therapist_id: nextTherapistId,
      username,
      password,
    });
    await newUser.save();

    res.status(201).json({ message: "ユーザー登録に成功しました。" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "サーバーエラーが発生しました。" });
  }
};

// ユーザーログイン
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "全てのフィールドを入力してください" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "ユーザーまたはパスワードが違います。" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "ユーザーまたはパスワードが違います。" });
    }

    // ✅ `JWT_SECRET` を環境変数から取得
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("エラー: JWT_SECRET が設定されていません！");
      return res.status(500).json({ message: "サーバー設定エラー。" });
    }

    // ✅ `iat` (発行時間) を追加してトークンを一意にする
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        sessionId: uuidv4(), // ✅ 毎回異なる一意な ID を生成
        iat: Math.floor(Date.now() / 1000),
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    console.log("発行された JWT:", token); // ✅ ここで確認
    res.status(200).json({ message: "ログイン成功しました。", token });
  } catch (error) {
    console.error("ログインエラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました。", error: error.message });
  }
};

// ユーザー取得
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, "therapist_id username");
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "ユーザーの取得に失敗しました。" });
  }
};
