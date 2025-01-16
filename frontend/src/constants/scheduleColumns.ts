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
    render: (value: string, row: RowType, index: number) => {
      const rowSpan = index % 3 === 0 ? 3 : 0; // 3行ごとに時間をマージ
      return {
        children: value,
        props: {
          rowSpan,
        },
      };
    },
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