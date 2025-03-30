import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTherapistList } from "@/api/fetchTherapist";
import { Therapist } from "@/types/therapists";


interface TherapistState {
  therapists: Therapist[];
  loading: boolean;
  error: string | null;
}

// 非同期処理でセラピストデータを取得
export const fetchTherapists = createAsyncThunk(
  "therapists/fetchTherapists",
  async (_, { rejectWithValue }) => {
    try {
      const therapistData = await fetchTherapistList();
      if (!Array.isArray(therapistData)) {
        throw new Error("取得したデータが配列ではありません！");
      }
      return therapistData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("エラーが発生しました");
    }
  }
);

const therapistSlice = createSlice({
  name: "therapists",
  initialState: {
    therapists: [],
    loading: false,
    error: null,
  } as TherapistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTherapists.fulfilled, (state, action) => {
        state.loading = false;
        state.therapists = action.payload;
      })
      .addCase(fetchTherapists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default therapistSlice.reducer;