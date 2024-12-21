const User = require('../models/userModel.js');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 入力データのバリデーション
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "全てのフィールドを入力してください。" }); //不正リクエスト
    }

    // ユーザーがすでに存在していないか確認
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "このユーザーはすでに登録済みです。" }); //ユーザーが登録済みの場合
    }

    const newUser = new User({ username, password });
    await newUser.save();

    // ユーザー登録成功
    res.status(201).json({ message: "ユーザー登録に成功しました。" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "サーバーエラーが発生しました。" });
  }
};

module.exports = { registerUser };
