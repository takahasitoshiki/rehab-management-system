import React from "react";
import { useDrop } from "react-dnd";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Patient } from "@/types/Patient";

interface DroppableCellProps {
  record: TimeSlot;
  onDropPatient: (record: TimeSlot, patient: Patient) => void;
  children?: React.ReactNode;
}

const DroppableCell: React.FC<DroppableCellProps> = ({ record, onDropPatient, children }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "PATIENT",
    drop: (item: { patient: Patient }) => {
      onDropPatient(record, item.patient);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div
      ref={dropRef}
      style={{ padding: "8px", backgroundColor: isOver ? "#f0f0f0" : "transparent" }}
    >
      {children}
    </div>
  );
};

export default DroppableCell;