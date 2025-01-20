import React, { useState } from "react";
import MainHeader from "./MainHeader";
import PatientList from "./PatientList/PatientList";
import ScheduleList from "./ScheduleList/ScheduleList";
import AchievementList from "./AchievementList/AchievementList";

const MainContent: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState({
    patients: true,
    schedules: true,
    achievements: true,
  });

  const [maximizedSection, setMaximizedSection] = useState<"patients" | "schedules" | "achievements" | null> (null)

  const baseSectionStyle: React.CSSProperties = {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "3px",
    transition: "flex 0.3s ease, width 0.3s ease, opacity 0.3s ease", // トランジションを設定
  };

  const handleClose = (section: "patients" | "schedules" | "achievements") => {
    setVisibleSections((prev) => ({ ...prev, [section]: false }));
  };

  const handleMaximize = (
    section: "patients" | "schedules" | "achievements"
  ) => {
    setMaximizedSection((prev) => (prev === section ? null : section));
  };

  const getSectionStyle = (section: "patients" | "schedules" | "achievements") => {
    if (maximizedSection === section) {
      return { ...baseSectionStyle}; // 最大化スタイル
    }
    if (maximizedSection) {
      return { ...baseSectionStyle, flex: 0, width: "0", opacity: 0, overflow: "hidden" }; 
    }
    return baseSectionStyle; // 通常スタイル
  };
  
  return (
    <div style={{ display: "flex", width: "100%" }}>

      {/* 患者一覧 */}
      {visibleSections.patients && (
      <div style={getSectionStyle("patients")}>
        <MainHeader title="患者一覧" onClose={() => handleClose("patients")} />
        <PatientList />
      </div>
      )}


      {/* 予約一覧 */}
      {visibleSections.schedules && (
      <div style={getSectionStyle("schedules")}>
        <MainHeader
          title="予約一覧"
          onClose={() => handleClose("schedules")}
          onMaximize={() => handleMaximize("schedules")}
        />
        <ScheduleList />
      </div>
      )}


      {/* 実績一覧 */}
      {visibleSections.achievements && (
      <div style={getSectionStyle("achievements")}>
        <MainHeader
          title="実績一覧"
          onClose={() => handleClose("achievements")}
          onMaximize={() => handleMaximize("achievements")}
        />
        <AchievementList />
      </div>
    )}

    </div>
  );
};

export default MainContent;
