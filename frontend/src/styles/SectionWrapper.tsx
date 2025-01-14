import React from "react";

const sectionStyle: React.CSSProperties = {
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff", // 必要に応じて追加
  height: "95%", 
  overflow: "auto"
};


interface SectionWrapperProps {
  children: React.ReactNode; // 子要素を受け取る
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return <div style={sectionStyle}>{children}</div>;
};

export default SectionWrapper;