import React from "react";
import { Table } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";

const PatientList: React.FC = () => {
  const columns = [
    { title: "患者コード", dataIndex: "code", key: "code" },
    { title: "患者名", dataIndex: "name", key: "name" },
    { title: "種別", dataIndex: "type", key: "type" },
  ];

  const data = [
    { key: "1", code: "0111111111", name: "テスト 太郎", type: "心リハ" },
  ];

  
  return (
    <SectionWrapper >
      <Table columns={columns} dataSource={data} pagination={false} />
    </SectionWrapper>
  );
};

export default PatientList;