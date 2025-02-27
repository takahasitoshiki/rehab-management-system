import React, { useState } from "react";
import MainHeader from "./MainHeader";
import PatientList from "./PatientList/PatientList";
import ScheduleList from "./ScheduleList/ScheduleList";
import AchievementList from "./AchievementList/AchievementList";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Dayjs } from "dayjs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
  selectedDates: [Dayjs, Dayjs];
}

const MainContent: React.FC<MainContentProps> = ({
  visibleSections,
  setVisibleSections,
  setMaximizedSection,
  selectedDates,
}) => {
  const [dataSource, setDataSource] = useState<TimeSlot[]>([]);

  const baseSectionStyle: React.CSSProperties = {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "3px",
    transition: "flex 0.3s ease, width 0.3s ease, opacity 0.3s ease",
  };

  const handleClose = (section: "patients" | "schedules" | "achievements") => {
    setVisibleSections((prev) => ({ ...prev, [section]: false }));
  };

  const handleMaximize = (
    section: "patients" | "schedules" | "achievements"
  ) => {
    setMaximizedSection(section);
    setVisibleSections({
      patients: section === "patients",
      schedules: section === "schedules",
      achievements: section === "achievements",
    });
  };

  const getSectionStyle = (
    section: "patients" | "schedules" | "achievements"
  ) => ({
    ...baseSectionStyle,
    flex: visibleSections[section] ? 1 : 0,
    transition: "flex 0.3s ease",
  });

  const onDropPatient = (timeSlotKey: string, patientName: string) => {
    setDataSource((prevData) =>
      prevData.map((slot) =>
        slot.key === timeSlotKey ? { ...slot, patient: patientName } : slot
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", width: "100%" }}>
        {visibleSections.patients && (
          <div style={{ ...getSectionStyle("patients"), flex: 2 }}>
            <MainHeader title="患者一覧" onClose={() => handleClose("patients")} />
            <PatientList />
          </div>
        )}

        {visibleSections.schedules && (
          <div style={{ ...getSectionStyle("schedules"), flex: 4, overflowX: "hidden", minWidth: "500px" }}>
            <MainHeader title="予約一覧" onClose={() => handleClose("schedules")} onMaximize={() => handleMaximize("schedules")} />
            <ScheduleList selectedDates={selectedDates} onDropPatient={onDropPatient} dataSource={dataSource} setDataSource={setDataSource} />
          </div>
        )}

        {visibleSections.achievements && (
          <div style={{ ...getSectionStyle("achievements"), flex: 4, overflowX: "hidden", minWidth: "500px" }}>
            <MainHeader title="実績一覧" onClose={() => handleClose("achievements")} onMaximize={() => handleMaximize("achievements")} />
            <AchievementList selectedDates={selectedDates} />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MainContent;