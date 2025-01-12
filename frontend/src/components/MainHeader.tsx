import React from "react";

interface MainHeaderProps {
  title: string; // ヘッダーのタイトルを動的に変更
  onClose: () => void; // 閉じるボタンのイベント
  onMaximize: () => void; // 画面いっぱいに広げるボタンのイベント
}

const MainHeader: React.FC<HeaderProps> = ({ title, onClose, onMaximize }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#b9d0d0", borderRadius: "8px 8px 0 0" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onMaximize} style={{ fontSize: "16px", padding: "5px 10px", backgroundColor: "#e6e6e6", border: "1px solid #ccc", borderRadius: "5px", cursor: "pointer" }}>🗖</button>
        <button onClick={onClose} style={{ fontSize: "16px", padding: "5px 10px", backgroundColor: "#ffcccc", border: "1px solid #ccc", borderRadius: "5px", cursor: "pointer" }}>✖</button>
      </div>
    </div>
  );
};

export default MainHeader;