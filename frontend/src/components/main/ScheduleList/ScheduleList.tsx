import React from "react";
import { Table } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { scheduleColumns } from "../../../constants/scheduleColumns";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";

const ScheduleList: React.FC = () => {
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

export default ScheduleList;
