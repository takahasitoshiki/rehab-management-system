import React from "react";
import { Layout, Menu, Table, Button, Input } from "antd";
import { UserOutlined, CalendarOutlined, TrophyOutlined, PoweroffOutlined, FileOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const scheduling: React.FC = () => {
  // テーブルデータ（患者一覧、予約一覧、実績一覧）
  const patientColumns = [
    { title: "患者コード", dataIndex: "code", key: "code" },
    { title: "患者名", dataIndex: "name", key: "name" },
    { title: "種別", dataIndex: "type", key: "type" },
  ];

  const patientData = [
    { key: "1", code: "0111111111", name: "テスト 太郎", type: "リハ" },
  ];

  const scheduleColumns = [
    { title: "名前", dataIndex: "name", key: "name" },
    { title: "人数", dataIndex: "count", key: "count" },
    { title: "単位", dataIndex: "units", key: "units" },
  ];

  const scheduleData = Array(20)
    .fill(null)
    .map((_, index) => ({
      key: index.toString(),
      name: `患者 ${index + 1}`,
      count: Math.floor(Math.random() * 5),
      units: Math.floor(Math.random() * 50),
    }));

  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <Header style={{ display: "flex", alignItems: "center", background: "#e6f7ff" }}>
        <Menu mode="horizontal" style={{ flexGrow: 1, justifyContent: "space-around" }}>
          <Menu.Item icon={<UserOutlined />}>患者一覧</Menu.Item>
          <Menu.Item icon={<CalendarOutlined />}>予約</Menu.Item>
          <Menu.Item icon={<TrophyOutlined />}>実績</Menu.Item>
          <Menu.Item icon={<PoweroffOutlined />}>終了</Menu.Item>
          <Input placeholder="期間" style={{ width: "200px", marginLeft: "10px" }} />
          <Button type="primary" icon={<FileOutlined />}>
            実績報告
          </Button>
        </Menu>
      </Header>

      {/* メインコンテンツ */}
      <Content style={{ padding: "20px", display: "flex", gap: "10px" }}>
        {/* 患者一覧 */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
          <h3>患者一覧</h3>
          <Table columns={patientColumns} dataSource={patientData} pagination={false} />
        </div>

        {/* 予約一覧 */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
          <h3>予約一覧</h3>
          <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} />
        </div>

        {/* 実績一覧 */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
          <h3>実績一覧</h3>
          <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} />
        </div>
      </Content>
    </Layout>
  );
};

export default scheduling;