import React from "react";
import MainHeader from "./MainHeader";
import PatientList from "./PatientList";
import ScheduleList from "./ScheduleList";
import AchievementList from "./AchievementList";

  const MainContent: React.FC = () => {

    const sectionStyle: React.CSSProperties = {
      flex: 1,
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
    };

    const handleClose = () => {
        console.log("閉じるボタンがクリックされました");
      };
    
      const handleMaximize = () => {
        console.log("画面を最大化します");
      };

  return (
    <div style={{ display: "flex", gap: "10px", width: "100%"}}>
      {/* 患者一覧 */}
      <div style={{ ...sectionStyle, flex: 1 }}>
      <MainHeader title="患者一覧" onClose={handleClose}/>
        <PatientList />
      </div>

      {/* 予約一覧 */}
      <div style={{ ...sectionStyle, flex: 1 }}>
      <MainHeader title="予約一覧" onClose={handleClose} onMaximize={handleMaximize} />
        <ScheduleList/>
      </div>

      {/* 実績一覧 */}
      <div style={{ ...sectionStyle, flex: 1 }}>
      <MainHeader title="実績一覧" onClose={handleClose} onMaximize={handleMaximize} />
        <AchievementList/>
      </div>
    </div>
  );
};

export default MainContent;