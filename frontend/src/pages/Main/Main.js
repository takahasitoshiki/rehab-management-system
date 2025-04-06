import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Layout } from "antd";
import CustomHeader from "../../components/main/Header";
import MainContent from "../../components/main/MainContent";
// import dayjs, { Dayjs } from "dayjs";
const { Content } = Layout;
const Scheduling = () => {
    const [visibleSections, setVisibleSections] = useState({
        patients: true,
        schedules: true,
        achievements: true,
    });
    const [maximizedSection, setMaximizedSection] = useState(null);
    return (_jsxs(Layout, { style: { height: "100vh" }, children: [_jsx(CustomHeader, { setVisibleSections: setVisibleSections }), _jsx(Content, { style: { padding: "5px", display: "flex" }, children: _jsx(MainContent, { visibleSections: visibleSections, maximizedSection: maximizedSection, setVisibleSections: setVisibleSections, setMaximizedSection: setMaximizedSection }) })] }));
};
export default Scheduling;
