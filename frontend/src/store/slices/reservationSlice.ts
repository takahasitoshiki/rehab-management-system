import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  fetchReservations,
  completedReservation,
  Reservation,
} from "@/api/fetchReservation";

// ✅ Redux Thunk で予約取得
export const getReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchReservations(); // ✅ 予約データ取得
    } catch (error) {
      console.error(error);
      return rejectWithValue("予約データの取得に失敗しました。");
    }
  }
);

// ✅ 完了済みの予約のみを取得
export const getCompletedReservations = createAsyncThunk(
  "reservations/fetchCompletedReservations",
  async (_, { rejectWithValue }) => {
    try {
      return await completedReservation(); // ✅ 完了済みの予約データを取得
    } catch (error) {
      console.error(error);
      return rejectWithValue("完了済み予約データの取得に失敗しました。");
    }
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [] as Reservation[],
    completedReservations: [] as Reservation[], 
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // ✅ 完了済み予約取得
      .addCase(getCompletedReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletedReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.completedReservations = action.payload; 
      })
      .addCase(getCompletedReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reservationSlice.reducer;

// ✅ セレクタ関数を作成
export const selectReservations = (state: RootState) =>
  state.reservations.reservations;
export const selectReservationsLoading = (state: RootState) =>
  state.reservations.loading;
