const VITE_APP_RESERVATION_URL = import.meta.env.VITE_APP_RESERVATION_URL
import { Patient } from "@/types/Patient";


export interface Reservation {
  reservation_id?: string; // ✅ MongoDB の `_id` (予約作成時には不要)
  patient_code: string;
  therapist_id: string;
  date: string;
  time: string;
  note?: string; // ✅ デフォルト ""
  completed?: boolean; // ✅ デフォルト false
  rehabilitation_details?: string; // ✅ デフォルト ""
  patient?: Patient;
}
  
  export const createReservation = async (data: Reservation): Promise<void> => {
    try {
      console.log("📡 API 送信データ:", data);
  
      const response = await fetch( `${VITE_APP_RESERVATION_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }
  
      console.log("✅ 予約登録成功");
    } catch (error) {
      console.error("❌ 予約登録エラー:", error);
      throw error; // 呼び出し元で処理
    }
  };

  // ✅ 予約取得 API
export const fetchReservations = async (): Promise<Reservation[]> => {
  try {
    console.log("📡 予約データ取得リクエスト");

    const response = await fetch(`${VITE_APP_RESERVATION_URL}/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("予約データが配列ではありません！");
    }

    return data as Reservation[];
  } catch (error) {
    console.error("❌ 予約データ取得エラー:", error);
    throw error; // 呼び出し元で処理
  }
};