import axios from "axios";
import { Patient } from "@/types/patient";

const VITE_APP_PATIENTS_URL = import.meta.env.VITE_APP_PATIENTS_URL;


export const fetchPatientsList = async () => {
    try{
        const response = await axios.get(`${VITE_APP_PATIENTS_URL}/all`); // テンプレートリテラルを修正
        return response.data.data || []; // 必要ならば .data を抽出
    }catch(error){
        console.error("API呼び出し中にエラーが発生しました。:", error);
        throw new Error("患者情報の取得に失敗しました");
    }
}

export const fetchPatientsRegister = async (patientData: Patient) => {
    try{
        const response = await axios.post(`${VITE_APP_PATIENTS_URL}`, patientData); // テンプレートリテラルを修正
        return response.data; // 必要ならば .data を抽出
    }catch(error){
        console.error("API呼び出し中にエラーが発生しました:", error);
        throw new Error("患者情報の登録に失敗しました");
    }
}