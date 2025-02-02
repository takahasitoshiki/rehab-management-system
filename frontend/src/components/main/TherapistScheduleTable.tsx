import React from "react";
import { Table } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";

type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string;
};

interface TherapistScheduleTableProps {
  therapists: { therapist_id: string; username: string }[];
  dataSource: TimeSlot[];
  loading: boolean;
  handleRowDoubleClick: (record: TimeSlot) => void;
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  therapists,
  dataSource,
  loading,
  handleRowDoubleClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        maxWidth: "120vw",
      }}
    >
      {therapists.map((therapist) => (
        <div
          key={therapist.therapist_id}
          style={{ flexShrink: 0}}
        >
          <Table<TimeSlot>
            className="custom-table"
            columns={scheduleColumns.map((column) => ({
              ...column,
              onCell: (record: TimeSlot) => ({
                onDoubleClick: () => handleRowDoubleClick(record),
              }),
            }))}
            title={() => `${therapist.username}`}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
            bordered
            size="small"
            style={{ tableLayout: "fixed" }}
          />
        </div>
      ))}
    </div>
  );
};

export default TherapistScheduleTable;