import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "@/store/index"; 

//  `startDate` 〜 `endDate` の範囲の日付リストを生成する関数
const getDateRange = (start: string, end: string): string[] => {
  const dates: string[] = [];
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
  selectedDates: getDateRange(
    dayjs().startOf("week").format("YYYY-MM-DD"),
    dayjs().endOf("week").format("YYYY-MM-DD")
  ),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.selectedDates = getDateRange(action.payload.startDate, action.payload.endDate);
    },
  },
});

export const { setDateRange } = dateSlice.actions;

//  Redux の `startDate` と `endDate` を取得するセレクター
// https://www.notion.so/createSelector-216fdcf6313680589b1ce26e27daafb8?source=copy_link
export const selectDateRange = createSelector(
  (state: RootState) => state.date.startDate,
  (state: RootState) => state.date.endDate,
  
  (startDate, endDate) => ({
    startDate: dayjs(startDate),
    endDate: dayjs(endDate),
  })
);


//  `selectedDates` を取得するセレクター
// export const selectSelectedDates = (state: RootState) =>
//   state.date.selectedDates.map((date: string) => dayjs(date));

// export default dateSlice.reducer;

export const selectSelectedDates = createSelector(
  (state: RootState) => state.date.selectedDates,
  (selectedDates) => selectedDates.map((date: string) => dayjs(date))
)