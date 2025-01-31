import axios from "axios";

const VITE_API_THERAPIST_URL = import.meta.env.VITE_API_THERAPIST_URL;

export interface Therapist {
    therapist_id: string;
    username: string;
  }


export const fetchTherapistList = async () => {
    try{
        const response = await axios.get(`${VITE_API_THERAPIST_URL}/all`); // テンプレートリテラルを修正
        return response.data.data || []; // 必要ならば .data を抽出
    }catch(error){
        console.error("API呼び出し中にエラーが発生しました:", error);
        throw new Error("セラピスト情報の取得に失敗しました");
    }
}