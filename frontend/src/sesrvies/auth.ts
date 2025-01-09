import axios from "axios";

const VITE_API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;


// ログインAPI
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${VITE_API_LOGIN_URL}/login`, { username, password });
  return response.data; // トークンやユーザー情報を返す
};

// セッションチェックAPI
export const checkSession = async (token: string) => {
  const response = await axios.get(`${VITE_API_LOGIN_URL}/session`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // セッション情報を返す
};

// ログアウトAPI（必要に応じて）
export const logout = async () => {
  const response = await axios.post(`${VITE_API_LOGIN_URL}/logout`);
  return response.data;
};