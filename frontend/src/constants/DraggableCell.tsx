import { useDrop } from "react-dnd";
import React from "react";

interface DroppableCellProps {
  recordKey: string;
  onDropPatient: (timeSlotKey: string, patientName: string) => void;
  children: React.ReactNode;
}

const DroppableCell: React.FC<DroppableCellProps> = ({ recordKey, onDropPatient, children }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "PATIENT",
    drop: (item: { name: string }) => {
      console.log("ドロップされた:", item.name, "→", recordKey);
      onDropPatient(recordKey, item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <td ref={dropRef} style={{ backgroundColor: isOver ? "#f0f0f0" : "white" }}>
      {children}
    </td>
  );
};

export default DroppableCell;