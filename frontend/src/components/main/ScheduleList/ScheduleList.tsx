import React from "react";
import { Table } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";

const ScheduleList: React.FC = () => {
  // データ生成関数（時間スロットを作成）
  const generateTimeSlots = () => {
    const startHour = 9;
    const endHour = 18; // 例として11時まで
    const timeSlots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 20, 40]) {
        timeSlots.push({
          key: `${hour}-${minute}`,
          hour: hour.toString().padStart(2, "0"),
          minute: minute.toString().padStart(2, "0"),
          patient: "", // 患者名は空欄
        });
      }
    }

    return timeSlots;
  };

  // カラム設定
  const columns = [
    {
      dataIndex: "hour",
      key: "hour",
      width: 50,
      render: (value, row, index) => {
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

  // データソース
  const dataSource = generateTimeSlots();

  return (
    <SectionWrapper>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="small"
        style={{ tableLayout: "fixed" }}
      />
    </SectionWrapper>
  );
};

export default ScheduleList;