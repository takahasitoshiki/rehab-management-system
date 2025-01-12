import React from "react";
import { Table } from "antd";
import MainHeader from "./MainHeader";

const MainContent: React.FC<{
  patientColumns: any;
  patientData: any;
  scheduleColumns: any;
  scheduleData: any;
}> = ({ patientColumns, patientData, scheduleColumns, scheduleData }) => {

    const handleClose = () => {
        console.log("閉じるボタンがクリックされました");
      };
    
      const handleMaximize = () => {
        console.log("画面を最大化します");
      };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
      {/* 患者一覧 */}
      <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
      <MainHeader title="患者一覧" onClose={handleClose} onMaximize={handleMaximize} />
      <Table columns={patientColumns} dataSource={patientData} pagination={false} />
      </div>

      {/* 予約一覧 */}
      <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
      <MainHeader title="予約一覧" onClose={handleClose} onMaximize={handleMaximize} />
        <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} />
      </div>

      {/* 実績一覧 */}
      <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
      <MainHeader title="実績一覧" onClose={handleClose} onMaximize={handleMaximize} />
        <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} />
      </div>
    </div>
  );
};

export default MainContent;