const VITE_APP_RESERVATION_URL = import.meta.env.VITE_APP_RESERVATION_URL
import { Reservation } from "@/types/reservation";

  
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
  
      console.log(" 予約登録成功");
    } catch (error) {
      console.error(" 予約登録エラー:", error);
      throw error; // 呼び出し元で処理
    }
  };

  //  予約取得 API
export const fetchReservations = async (): Promise<Reservation[]> => {
  try {

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
    console.error(" 予約データ取得エラー:", error);
    throw error; // 呼び出し元で処理
  }
};

// 予約更新 API
export const updateReservation = async (reservation: Reservation): Promise<Reservation> => {
  try {
    if (!reservation._id) {
      throw new Error("予約IDが見つかりません"); // _id がない場合にエラーを投げる
    }
    const response = await fetch(`${VITE_APP_RESERVATION_URL}${reservation._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation), 
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }

    const updatedReservation = await response.json();

    return updatedReservation as Reservation;
  } catch (error) {
    console.error(" 予約データ更新エラー:", error);
    throw error; // 呼び出し元で処理
  }
};


// 予約が完了した予約リストのみ取得
export const completedReservation = async (): Promise<Reservation[]> => {
  try {

    const response = await fetch(`${VITE_APP_RESERVATION_URL}/completed`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }

    const completedReservation = await response.json();

    return completedReservation as Reservation[];
  } catch (error) {
    console.error(" 予約データ取得エラー:", error);
    throw error; // 呼び出し元で処理
  }
};