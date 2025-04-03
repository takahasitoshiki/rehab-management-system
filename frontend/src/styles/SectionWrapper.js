import { jsx as _jsx } from "react/jsx-runtime";
const sectionStyle = {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    height: "95%",
    overflow: "auto",
    maxWidth: "120vw",
};
const SectionWrapper = ({ children }) => {
    return _jsx("div", { style: sectionStyle, children: children });
};
export default SectionWrapper;
