import React from "react";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Patient } from "@/types/patient";
import DroppableCell from "@/components/main/DroppableCell";
import { Tag } from "antd";

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
      const isReported = record.reservations?.[0]?.reported;

      return (
        <DroppableCell record={record} onDropPatient={onDropPatient}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>{record.patient}</span>
            {isReported && <Tag color="blue">送信済み</Tag>}
          </div>
        </DroppableCell>
      );
    },
  },
];
