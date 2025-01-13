import React from "react";
import { Table } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";

const ScheduleList: React.FC = () => {
  const columns = [
    { title: "名前", dataIndex: "name", key: "name" },
    { title: "人数", dataIndex: "count", key: "count" },
    { title: "単位", dataIndex: "units", key: "units" },
  ];

  const data = Array(10)
    .fill(null)
    .map((_, index) => ({
      key: index.toString(),
      name: `患者 ${index + 1}`,
      count: Math.floor(Math.random() * 5),
      units: Math.floor(Math.random() * 50),
    }));

  return (
    <SectionWrapper>
      <Table columns={columns} dataSource={data} pagination={false} />
    </SectionWrapper>
  );
};

export default ScheduleList;