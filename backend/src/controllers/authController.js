const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


// ユーザー登録
exports.registerUser = async (req, res) => {
  const { therapist_id, username, password } = req.body;

  try {
    // 入力データのバリデーション
    if (!therapist_id ||!username || !password) {
      return res
        .status(400)
        .json({ message: "全てのフィールドを入力してください。" }); //不正リクエスト
    }

    // ユーザーがすでに存在していないか確認
    const existingUser = await User.findOne({ therapist_id });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "このユーザーはすでに登録済みです。" }); //ユーザーが登録済みの場合
    }

    const newUser = new User({ therapist_id, username, password });
    await newUser.save();

    // ユーザー登録成功
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
    // 入力データのバリデーション
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "全てのフィールドを入力してください" }); //不正リクエスト
    }

    // ユーザーの検索
    const user = await User.findOne({ username });
    console.log(user); // ユーザーオブジェクトを確認
    if (!user) {
      return res
        .status(401)
        .json({ message: "ユーザーまたはパスワードが違います。" });
    }

    // パスワードの検証
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "ユーザーまたはパスワードが違います。" });
    }

    // JWTの発行
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "ログイン成功しました。", token });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "サーバーエラーが発生しました。",
        error: error.message,
      });
  }
};

// ユーザー取得
exports.getAllUser =async (req, res) => {
  try {
    const users = await User.find({},"therapist_id username" ); 
    if (!users || users.length === 0){
      return res.status(404).json({ error: "ユーザーが見つかりません"})
    }
    res
      .status(200)
      .json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "ユーザーの取得に失敗しました。" });
  }
};
