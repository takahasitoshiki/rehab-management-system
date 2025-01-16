import React from "react";
import { Table } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { scheduleColumns, RowType } from "../../../constants/scheduleColumns";


const AchievementList: React.FC = () => {
  const generateTimeSlots = () => {
    const startHour = 9;
    const endHour = 18; 
    const timeSlots: RowType[] = [];

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

  // データソース
  const dataSource = generateTimeSlots();

  return (
    <SectionWrapper>
      <Table
        className="custom-table"
        columns={scheduleColumns}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="small"
        style={{ tableLayout: "fixed" }}
      />
    </SectionWrapper>
  );
};

export default AchievementList;