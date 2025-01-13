import React from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/Header";
import MainContent from "../../components/MainContent"


const { Content } = Layout;

const scheduling: React.FC = () => {

  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <CustomHeader/>
      {/* メインコンテンツ */}
      <Content style={{ padding: "10px", display: "flex", gap: "10px" }}>
      <MainContent/>
      </Content>
    </Layout>
  );
};

export default scheduling;