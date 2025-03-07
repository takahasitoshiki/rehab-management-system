import { configureStore } from "@reduxjs/toolkit";
import therapistReducer from "./slices/therapistSlice";
import reservationReducer from "./slices/reservationSlice"; 


export const store = configureStore({
  reducer: {
    therapists: therapistReducer,
    reservations: reservationReducer, // ✅ 追加
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;