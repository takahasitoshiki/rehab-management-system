import { configureStore } from "@reduxjs/toolkit";
import therapistReducer from "./slices/therapistSlice";

export const store = configureStore({
  reducer: {
    therapists: therapistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;