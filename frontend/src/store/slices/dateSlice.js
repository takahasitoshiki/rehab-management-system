import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// ✅ `startDate` 〜 `endDate` の範囲の日付リストを生成する関数
const getDateRange = (start, end) => {
    const dates = [];
    let currentDate = dayjs(start);
    while (currentDate.isBefore(dayjs(end)) || currentDate.isSame(dayjs(end), "day")) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
    }
    return dates;
};
const initialState = {
    startDate: dayjs().startOf("week").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("week").format("YYYY-MM-DD"),
    selectedDates: getDateRange(dayjs().startOf("week").format("YYYY-MM-DD"), dayjs().endOf("week").format("YYYY-MM-DD")),
};
const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.selectedDates = getDateRange(action.payload.startDate, action.payload.endDate);
        },
    },
});
export const { setDateRange } = dateSlice.actions;
// ✅ Redux の `startDate` と `endDate` を取得するセレクター
export const selectDateRange = (state) => ({
    startDate: dayjs(state.date.startDate), // ✅ 文字列 → dayjs に変換
    endDate: dayjs(state.date.endDate),
});
// ✅ `selectedDates` を取得するセレクター
export const selectSelectedDates = (state) => state.date.selectedDates.map((date) => dayjs(date));
export default dateSlice.reducer;
