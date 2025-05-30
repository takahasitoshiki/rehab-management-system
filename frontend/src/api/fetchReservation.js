const VITE_APP_RESERVATION_URL = import.meta.env.VITE_APP_RESERVATION_URL;
export const createReservation = async (data) => {
    try {
        console.log("📡 API 送信データ:", data);
        const response = await fetch(`${VITE_APP_RESERVATION_URL}`, {
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
    }
    catch (error) {
        console.error("❌ 予約登録エラー:", error);
        throw error; // 呼び出し元で処理
    }
};
// ✅ 予約取得 API
export const fetchReservations = async () => {
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
        return data;
    }
    catch (error) {
        console.error("❌ 予約データ取得エラー:", error);
        throw error; // 呼び出し元で処理
    }
};
// ✅ 予約更新 API
export const updateReservation = async (reservation) => {
    try {
        if (!reservation._id) {
            throw new Error("予約IDが見つかりません"); // _id がない場合にエラーを投げる
        }
        const response = await fetch(`${VITE_APP_RESERVATION_URL}${reservation._id}`, {
            method: "PUT", // ✅ PUTメソッドを使用
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservation), // ✅ 更新する予約データを送信
        });
        if (!response.ok) {
            throw new Error(`APIエラー: ${response.status}`);
        }
        const updatedReservation = await response.json();
        console.log("✅ 予約データ更新成功:", updatedReservation);
        return updatedReservation;
    }
    catch (error) {
        console.error("❌ 予約データ更新エラー:", error);
        throw error; // 呼び出し元で処理
    }
};
// 予約が完了した予約リストのみ取得
export const completedReservation = async () => {
    try {
        const response = await fetch(`${VITE_APP_RESERVATION_URL}/completed`, {
            method: "GET", // ✅ PUTメソッドを使用
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`APIエラー: ${response.status}`);
        }
        const completedReservation = await response.json();
        console.log("✅ 完了した予約のみを取得成功:", completedReservation);
        return completedReservation;
    }
    catch (error) {
        console.error("❌ 予約データ取得エラー:", error);
        throw error; // 呼び出し元で処理
    }
};
