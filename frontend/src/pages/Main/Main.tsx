import React, { useState } from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/main/Header";
import MainContent from "../../components/main/MainContent";
import dayjs, { Dayjs } from "dayjs";


const { Content } = Layout;

const Scheduling: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState({
    patients: true,
    schedules: true,
    achievements: true,
  });

  const [maximizedSection, setMaximizedSection] = useState<
    "patients" | "schedules" | "achievements" | null
  >(null);
  
  // 🔹 期間を管理する State
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>([
    dayjs().startOf("week"),
    dayjs().endOf("week"),
  ]);

  return (
    <Layout style={{ height: "100vh" }}>
      {/* ヘッダー */}
      <CustomHeader
        setVisibleSections={setVisibleSections}
        onDateChange={setSelectedDates}

      />
      {/* メインコンテンツ */}
      <Content style={{ padding: "5px", display: "flex" }}>
        <MainContent
          visibleSections={visibleSections}
          maximizedSection={maximizedSection}
          setVisibleSections={setVisibleSections}
          setMaximizedSection={setMaximizedSection}
          selectedDates={selectedDates}
        />
      </Content>
    </Layout>
  );
};

export default Scheduling;
