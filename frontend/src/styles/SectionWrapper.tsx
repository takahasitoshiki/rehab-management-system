import React from "react";

const sectionStyle: React.CSSProperties = {
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff", 
  height: "95%", 
  overflow: "auto",
  maxWidth: "120vw",
};

interface SectionWrapperProps {
  children: React.ReactNode; // 子要素を受け取る
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return <div style={sectionStyle}>{children}</div>;
};

export default SectionWrapper;