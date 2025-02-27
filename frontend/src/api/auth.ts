import axios from "axios";

const VITE_API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;


// ログインAPI
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${VITE_API_LOGIN_URL}/login`, { username, password });
  return response.data; // トークンやユーザー情報を返す
};

