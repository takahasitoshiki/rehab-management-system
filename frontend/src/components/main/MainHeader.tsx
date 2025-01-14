import React from "react";

interface MainHeaderProps {
  title: string; // ヘッダーのタイトルを動的に変更
  onClose: () => void; // 閉じるボタンのイベント
  onMaximize?: () => void; // 画面いっぱいに広げるボタンのイベント
}

const MainHeader: React.FC<MainHeaderProps> = ({ title, onClose, onMaximize }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", backgroundColor: "#b9d0d0", borderRadius: "8px 8px 0 0" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {onMaximize && ( // onMaximize がある場合のみ表示
          <button onClick={onMaximize} style={{ padding: "5px 10px", backgroundColor: "#d9f7be", border: "1px solid #91d5ff", borderRadius: "5px", cursor: "pointer" }}>🗖</button>
        )}
        <button onClick={onClose} style={{ padding: "5px 10px", backgroundColor: "#ffa39e", border: "1px solid #ff7875", borderRadius: "5px", cursor: "pointer" }}>✖</button>
      </div>
    </div>
  );
};

export default MainHeader;