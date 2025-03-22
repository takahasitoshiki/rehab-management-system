import axios from "axios";

const VITE_API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

// ログインAPI
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${VITE_API_LOGIN_URL}/login`, {
    username,
    password,
  });
  return response.data; // トークンやユーザー情報を返す
};

// ログアウトAPI
export const logout = async () => {
  const token = localStorage.getItem("token"); // トークンを取得
  if (!token) throw new Error("ログイントークンがありません");

  try {
    await axios.post(
      `${VITE_API_LOGIN_URL}/logout`,
      null, // ← POST ボディなし
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("❌ ログアウトに失敗しました:", error);
    throw error;
  }
};
