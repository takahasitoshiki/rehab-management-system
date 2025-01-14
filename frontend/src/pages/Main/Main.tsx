import React from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/main/Header";
import MainContent from "../../components/main/MainContent"


const { Content } = Layout;

const scheduling: React.FC = () => {

  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <CustomHeader/>
      {/* メインコンテンツ */}
      <Content style={{ padding: "5px", display: "flex"}}>
      <MainContent/>
      </Content>
    </Layout>
  );
};

export default scheduling;