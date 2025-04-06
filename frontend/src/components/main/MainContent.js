import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import MainHeader from "./MainHeader";
import PatientList from "./PatientList/PatientList";
import ScheduleList from "./ScheduleList/ScheduleList";
import AchievementList from "./AchievementList/AchievementList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const MainContent = ({ visibleSections, setVisibleSections, setMaximizedSection, }) => {
    const [dataSource, setDataSource] = useState([]);
    const baseSectionStyle = {
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "3px",
        transition: "flex 0.3s ease, width 0.3s ease, opacity 0.3s ease",
    };
    const handleClose = (section) => {
        setVisibleSections((prev) => ({ ...prev, [section]: false }));
    };
    const handleMaximize = (section) => {
        setMaximizedSection(section);
        setVisibleSections({
            patients: section === "patients",
            schedules: section === "schedules",
            achievements: section === "achievements",
        });
    };
    const getSectionStyle = (section) => ({
        ...baseSectionStyle,
        flex: visibleSections[section] ? 1 : 0,
        transition: "flex 0.3s ease",
    });
    const onDropPatient = (record, patient, updatedReservations) => {
        setDataSource((prevData) => prevData.map((slot) => slot.key === record.key ? { ...slot, patient: patient.patients_name, updatedReservations } : slot));
    };
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsxs("div", { style: { display: "flex", width: "100%" }, children: [visibleSections.patients && (_jsxs("div", { style: { ...getSectionStyle("patients"), flex: 2 }, children: [_jsx(MainHeader, { title: "\u60A3\u8005\u4E00\u89A7", onClose: () => handleClose("patients") }), _jsx(PatientList, {})] })), visibleSections.schedules && (_jsxs("div", { style: { ...getSectionStyle("schedules"), flex: 4, overflowX: "hidden", minWidth: "500px" }, children: [_jsx(MainHeader, { title: "\u4E88\u7D04\u4E00\u89A7", onClose: () => handleClose("schedules"), onMaximize: () => handleMaximize("schedules") }), _jsx(ScheduleList, { onDropPatient: onDropPatient, dataSource: dataSource, setDataSource: setDataSource })] })), visibleSections.achievements && (_jsxs("div", { style: { ...getSectionStyle("achievements"), flex: 4, overflowX: "hidden", minWidth: "500px" }, children: [_jsx(MainHeader, { title: "\u5B9F\u7E3E\u4E00\u89A7", onClose: () => handleClose("achievements"), onMaximize: () => handleMaximize("achievements") }), _jsx(AchievementList, { onDropPatient: onDropPatient, dataSource: dataSource, setDataSource: setDataSource })] }))] }) }));
};
export default MainContent;
