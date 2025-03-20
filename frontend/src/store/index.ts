import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"; // ✅ 追加
import therapistReducer from "./slices/therapistSlice";
import reservationReducer from "./slices/reservationSlice"; 
import dateReducer from "./slices/dateSlice"; 



export const store = configureStore({
  reducer: {
    therapists: therapistReducer,
    reservations: reservationReducer, 
    date:dateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // ✅ ログを出力
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;