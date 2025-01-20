import React,{useState} from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/main/Header";
import MainContent from "../../components/main/MainContent"


const { Content } = Layout;

const scheduling: React.FC = () => {

  const [visibleSections, setVisibleSections] = useState({
    patients: true,
    schedules: true,
    achievements: true,
  });

  const [maximizedSection, setMaximizedSection] = useState<"patients" | "schedules" | "achievements" | null>(null);


  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <CustomHeader setVisibleSections={setVisibleSections} />
      {/* メインコンテンツ */}
      <Content style={{ padding: "5px", display: "flex"}}>
      <MainContent
          visibleSections={visibleSections}
          maximizedSection={maximizedSection}
          setVisibleSections={setVisibleSections}
          setMaximizedSection={setMaximizedSection}
        />      </Content>
    </Layout>
  );
};

export default scheduling;