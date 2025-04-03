import axios from "axios";
const VITE_API_THERAPIST_URL = import.meta.env.VITE_API_THERAPIST_URL;
export const fetchTherapistList = async () => {
    try {
        const response = await axios.get(`${VITE_API_THERAPIST_URL}/all`);
        return response.data || [];
    }
    catch (error) {
        console.error("❌ API呼び出しエラー:", error);
        return []; // エラー時は空の配列を返す
    }
};
export const createTherapist = async (therapist) => {
    try {
        const response = await axios.post(`${VITE_API_THERAPIST_URL}/register`, therapist);
        return response.data;
    }
    catch (error) {
        console.error("❌ セラピストの登録ができませんでした:", error);
        return null; // エラー時は空の配列を返す
    }
};
