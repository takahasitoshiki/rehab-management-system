import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTherapistList } from "@/api/fetchTherapist";
// 非同期処理でセラピストデータを取得
export const fetchTherapists = createAsyncThunk("therapists/fetchTherapists", async (_, { rejectWithValue }) => {
    try {
        const therapistData = await fetchTherapistList();
        if (!Array.isArray(therapistData)) {
            throw new Error("取得したデータが配列ではありません！");
        }
        return therapistData;
    }
    catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("エラーが発生しました");
    }
});
const therapistSlice = createSlice({
    name: "therapists",
    initialState: {
        therapists: [],
        loading: false,
        error: null,
    },
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
            state.error = action.payload;
        });
    },
});
export default therapistSlice.reducer;
