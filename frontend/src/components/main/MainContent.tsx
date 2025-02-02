import React from "react";
import MainHeader from "./MainHeader";
import PatientList from "./PatientList/PatientList";
import ScheduleList from "./ScheduleList/ScheduleList";
import AchievementList from "./AchievementList/AchievementList";

interface MainContentProps {
  visibleSections: {
    patients: boolean;
    schedules: boolean;
    achievements: boolean;
  };
  maximizedSection: "patients" | "schedules" | "achievements" | null;
  setVisibleSections: React.Dispatch<
    React.SetStateAction<{
      patients: boolean;
      schedules: boolean;
      achievements: boolean;
    }>
  >;
  setMaximizedSection: React.Dispatch<
    React.SetStateAction<"patients" | "schedules" | "achievements" | null>
  >;
}

const MainContent: React.FC<MainContentProps> = ({
  visibleSections,
  setVisibleSections,
  setMaximizedSection,
}) => {
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
    setMaximizedSection(section); // 最大化するセクションを設定

    // 他のセクションを非表示にし、対象セクションを最大化
    setVisibleSections({
      patients: section === "patients",
      schedules: section === "schedules",
      achievements: section === "achievements",
    });
  };

  const getSectionStyle = (
    section: "patients" | "schedules" | "achievements"
  ) => {
    return {
      ...baseSectionStyle,
      flex: visibleSections[section] ? 1 : 0, // 表示状態に応じてサイズを変更
      transition: "flex 0.3s ease", // スムーズな遷移を適用
    };
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* 患者一覧 */}
      {visibleSections.patients && (
        <div style={{ ...getSectionStyle("patients"), flex: 2 }}>
          <MainHeader
            title="患者一覧"
            onClose={() => handleClose("patients")}
          />
          <PatientList />
        </div>
      )}

      {/* 予約一覧 */}
      {visibleSections.schedules && (
        <div style={{ ...getSectionStyle("schedules"), flex: 4 }}>
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
        <div style={{ ...getSectionStyle("achievements"), flex: 4 }}>
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
