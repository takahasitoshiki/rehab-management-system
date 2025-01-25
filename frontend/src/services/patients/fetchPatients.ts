import axios from "axios";

const VITE_APP_PATIENTS_URL = import.meta.env.VITE_APP_PATIENTS_URL;

export interface Patient {
    patients_code: string;
    patients_name: string;
    disease_name: string;
    classification: string;
    date_of_birth: string; // ISO形式の日付
    gender: string; // "1"（男性）または "2"（女性）
    registration_date: string; // ISO形式の日付
    treatment_plan: string;
    note?: string; // 任意のフィールド
  }


export const fetchPatientsList = async () => {
    try{
        const response = await axios.get(`${VITE_APP_PATIENTS_URL}/all`); // テンプレートリテラルを修正
        return response.data.data || []; // 必要ならば .data を抽出
    }catch(error){
        console.error("API呼び出し中にエラーが発生しました:", error);
        throw new Error("患者情報の取得に失敗しました");
    }
}

export const fetchPatientsRegister = async (patientData: Patient) => {
    try{
        const response = await axios.post(`${VITE_APP_PATIENTS_URL}`, patientData); // テンプレートリテラルを修正
        console.log("登録レスポンス:"+ response.data)
        return response.data; // 必要ならば .data を抽出
    }catch(error){
        console.error("API呼び出し中にエラーが発生しました:", error);
        throw new Error("患者情報の登録に失敗しました");
    }
}