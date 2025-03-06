const VITE_APP_RESERVATION_URL = import.meta.env.VITE_APP_RESERVATION_URL

export interface ReservationRequest {
    patient_code: string;
    therapist_id: string | null;
    date: string;
    time: string;
    note?: string;
  }
  
  export const createReservation = async (data: ReservationRequest): Promise<void> => {
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