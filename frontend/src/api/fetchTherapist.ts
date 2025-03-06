import axios from "axios";

const VITE_API_THERAPIST_URL = import.meta.env.VITE_API_THERAPIST_URL;

console.log("🟢 APIのURL:", VITE_API_THERAPIST_URL);
export interface Therapist {
  therapist_id: string;
  username: string;
}

export const fetchTherapistList = async () => {
  try {
    const response = await axios.get(`${VITE_API_THERAPIST_URL}/all`);
    return response.data || [];
  } catch (error) {
    console.error("❌ API呼び出しエラー:", error);
    return []; // エラー時は空の配列を返す
  }
};
