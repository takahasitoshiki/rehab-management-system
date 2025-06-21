import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Tag } from "antd";
import { Patient } from "@/types/patient";
import DroppableCell from "@/components/main/DroppableCell";

export const createScheduleColumns = (
  onDropPatient: (record: TimeSlot, patient: Patient) => void
) => [
  {
    dataIndex: "hour",
    key: "hour",
    width: 60,
    onCell: (record: TimeSlot) => ({ rowSpan: record.hourRowSpan }),
    render: (value: string, record: TimeSlot) =>
      record.hourRowSpan === 0 ? null : value,
  },
  {
    dataIndex: "minute",
    key: "minute",
    width: 60,
    onCell: (record: TimeSlot) => ({ rowSpan: record.minuteRowSpan }),
    render: (value: string, record: TimeSlot) =>
      record.minuteRowSpan === 0 ? null : value,
  },
  {
    dataIndex: "patient",
    key: "patient",
    width: 250,
    render: (_: string, record: TimeSlot) => {
      const isCompleted = record.reservations?.[0]?.completed;
  
      return (
        <DroppableCell record={record} onDropPatient={onDropPatient}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            <span>{record.patient}</span>
            {isCompleted && <Tag color="green">完了</Tag>}
          </div>
        </DroppableCell>
      );
    },
  }
];
