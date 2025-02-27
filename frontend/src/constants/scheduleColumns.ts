
export type RowType = {
  hour: string; 
  minute: string;  
  patient: string; 
};

export const scheduleColumns = [
  {
    dataIndex: "hour",
    key: "hour",
    width: 50,
    onCell: (_: RowType, index: number) => ({
      rowSpan: index % 3 === 0 ? 3 : 0, // ✅ `onCell` で `rowSpan` を適用
    }),
    render: (value: string) => value, // ✅ `render` では値のみ返す
  },
  {
    dataIndex: "minute",
    key: "minute",
    width: 50,
  },
  {
    dataIndex: "patient",
    key: "patient",
    width: 200,
  },
];