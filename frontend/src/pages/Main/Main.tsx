import React from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/Header";
import MainContent from "../../components/MainContent"


const { Content } = Layout;

const scheduling: React.FC = () => {
  // テーブルデータ（患者一覧、予約一覧、実績一覧）
  const patientColumns = [
    { title: "患者コード", dataIndex: "code", key: "code" },
    { title: "患者名", dataIndex: "name", key: "name" },
    { title: "種別", dataIndex: "type", key: "type" },
  ];

  const patientData = [
    { key: "1", code: "011111", name: "テスト 太郎", type: "リハ" },
  ];

  const scheduleColumns = [
    { title: "名前", dataIndex: "name", key: "name" },
    { title: "人数", dataIndex: "count", key: "count" },
    { title: "単位", dataIndex: "units", key: "units" },
  ];

  const scheduleData = Array(10)
    .fill(null)
    .map((_, index) => ({
      key: index.toString(),
      name: `患者 ${index + 1}`,
      count: Math.floor(Math.random() * 5),
      units: Math.floor(Math.random() * 1),
    }));

  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <CustomHeader/>
      {/* メインコンテンツ */}
      <Content style={{ padding: "20px", display: "flex", gap: "10px" }}>
      <MainContent
        patientColumns={patientColumns}
        patientData={patientData}
        scheduleColumns={scheduleColumns}
        scheduleData={scheduleData}
      />
      </Content>
    </Layout>
  );
};

export default scheduling;