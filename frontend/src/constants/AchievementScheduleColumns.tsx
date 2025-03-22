import React from "react";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Patient } from "@/types/Patient";
import DroppableCell from "@/components/main/DroppableCell";

export const createScheduleColumns = (
  onDropPatient: (record: TimeSlot, patient: Patient) => void
) => [
  {
    dataIndex: "hour",
    key: "hour",
    width: 60,
    onCell: (record: any) => ({ rowSpan: record.hourRowSpan }),
    render: (value: string, record: any) =>
      record.hourRowSpan === 0 ? null : value,
  },
  {
    dataIndex: "minute",
    key: "minute",
    width: 60,
    onCell: (record: any) => ({ rowSpan: record.minuteRowSpan }),
    render: (value: string, record: any) =>
      record.minuteRowSpan === 0 ? null : value,
  },
  {
    dataIndex: "patient",
    key: "patient",
    width: 250,
    render: (_: string, record: TimeSlot) => (
      <DroppableCell record={record} onDropPatient={onDropPatient}>
        {record.patient}
      </DroppableCell>
    ),
  },
];
