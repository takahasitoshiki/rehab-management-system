import { TimeSlot } from "@/utils/timeSlotGenerator";

export const scheduleColumns = [
  {
    dataIndex: "hour",
    key: "hour",
    width: 50,
    onCell: (record: TimeSlot, index: number, allRecords?: TimeSlot[]) => {
      if (!allRecords || index === 0) return { rowSpan: record.rowSpan }; // 最初の行はそのまま

      const prevRecord = allRecords[index - 1];

      // 直前の `hour` が異なる場合のみ `rowSpan` を適用
      return {
        rowSpan: prevRecord && prevRecord.hour !== record.hour ? record.rowSpan : 0,
      };
    },
    render: (value: string, record: TimeSlot, index: number, allRecords?: TimeSlot[]) => {
      if (!allRecords || index === 0) return value;
      const prevRecord = allRecords[index - 1];

      // 直前の `hour` と異なる場合のみ表示
      return prevRecord && prevRecord.hour !== record.hour ? value : null;
    },
  },
  {
    dataIndex: "minute",
    key: "minute",
    width: 50,
    onCell: (record: TimeSlot, index: number, allRecords?: TimeSlot[]) => {
      if (!allRecords || index === 0) return { rowSpan: 1 };

      const prevRecord = allRecords[index - 1];

      // 同じ時間 (`hour`) の中で、同じ `minute` の場合は結合
      return {
        rowSpan: prevRecord && prevRecord.minute !== record.minute ? 1 : 0,
      };
    },
    render: (value: string, record: TimeSlot, index: number, allRecords?: TimeSlot[]) => {
      if (!allRecords || index === 0) return value;
      const prevRecord = allRecords[index - 1];

      // 同じ `minute` の場合は表示しない
      return prevRecord && prevRecord.minute !== record.minute ? value : null;
    },
  },
  {
    dataIndex: "patient",
    key: "patient",
    width: 200,
  },
];
