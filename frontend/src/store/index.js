import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"; // ✅ 追加
import therapistReducer from "./slices/therapistSlice";
import reservationReducer from "./slices/reservationSlice";
import dateReducer from "./slices/dateSlice";
import patientsReducer from "./slices/patientsSlice";
export const store = configureStore({
    reducer: {
        therapists: therapistReducer,
        reservations: reservationReducer,
        date: dateReducer,
        patients: patientsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // ✅ ログを出力
});
