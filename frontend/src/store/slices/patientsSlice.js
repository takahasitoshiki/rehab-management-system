import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPatientsList, fetchPatientsRegister } from "@/api/fetchPatients";
// ✅ Redux Thunk で患者情報を取得
export const getPatients = createAsyncThunk("patients/fetchPatients", async (_, { rejectWithValue }) => {
    try {
        return await fetchPatientsList(); // ✅ 患者情報を取得
    }
    catch (error) {
        console.error(error);
        return rejectWithValue("患者情報の取得に失敗しました。");
    }
});
// ✅ Redux Thunk で患者情報を登録
export const registerPatient = createAsyncThunk("patients/registerPatient", async (patientData, { rejectWithValue }) => {
    try {
        return await fetchPatientsRegister(patientData); // ✅ 患者情報を登録
    }
    catch (error) {
        console.error(error);
        return rejectWithValue("患者情報の登録に失敗しました。");
    }
});
const patientsSlice = createSlice({
    name: "patients",
    initialState: {
        patients: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPatients.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getPatients.fulfilled, (state, action) => {
            state.loading = false;
            state.patients = action.payload;
        })
            .addCase(getPatients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(registerPatient.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.patients.push(action.payload);
        })
            .addCase(registerPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export default patientsSlice.reducer;
