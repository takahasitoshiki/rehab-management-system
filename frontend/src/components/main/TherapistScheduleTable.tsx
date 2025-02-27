import React from "react";
import { Table } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";
import { useDrop } from "react-dnd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { TimeSlot } from "@/types/timeSlot";

dayjs.extend(isBetween);

interface Therapist {
  therapist_id: string;
  username: string;
}

interface Patient {
  _id: string;
  patients_code: string;
  patients_name: string;
  classification: string;
}

interface TherapistScheduleTableProps {
  dataSource: TimeSlot[];
  handleRowDoubleClick: (record: TimeSlot) => void;
  selectedDates: [Dayjs, Dayjs] | null;
  onDropPatient: (
    timeSlotKey: string,
    patientName: Patient,
    therapists: Therapist
  ) => void;
  therapists: Therapist[]; // ✅ therapists を追加
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,
  selectedDates,
  onDropPatient,
  therapists,
}) => {
  const DroppableCell: React.FC<{
    record: TimeSlot;
    onDropPatient: (
      key: string,
      patient: Patient,
      therapist: Therapist
    ) => void;
    handleRowDoubleClick: (record: TimeSlot) => void;
  }> = ({ record, onDropPatient, handleRowDoubleClick }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "PATIENT",

      drop: (item: { patient?: Patient }) => {
        if (!record || !item.patient) return;

        const foundTherapist = therapists.find(
          (t) => t.therapist_id === record.therapist_id
        );
        if (!foundTherapist) {
          console.warn(
            `⚠ Therapist ID (${record.therapist_id}) が見つかりません`
          );
          return;
        }

        onDropPatient(record.key, item.patient, foundTherapist);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={dropRef} // ✅ useDrop を適用
        style={{
          backgroundColor: isOver ? "#f0f0f0" : "white",
        }}
        onDoubleClick={() => handleRowDoubleClick(record)}
      >
        {record.patient || ""}
      </div>
    );
  };

  const modifiedColumns = scheduleColumns.map((column) => ({
    ...column,
    onCell: (record: TimeSlot) => ({
      children: (
        <DroppableCell
          record={record}
          onDropPatient={onDropPatient}
          handleRowDoubleClick={handleRowDoubleClick}
        />
      ),
    }),
  }));

  console.log("🛠 therapists の現在の状態:", therapists);

if (!therapists || therapists.length === 0) {
  console.error("❌ therapists が undefined または 空の配列です！");
  return <p>セラピスト情報が取得できませんでした。</p>; // `undefined` の場合はエラーメッセージを表示
}

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {(() => {
        if (
          !selectedDates ||
          !Array.isArray(selectedDates) ||
          selectedDates.length !== 2
        ) {
          return <p>日付が正しく選択されていません。</p>;
        }

        const [startDate, endDate] = selectedDates;

        // ✅ `Dayjs` オブジェクトかチェック
        if (!dayjs.isDayjs(startDate) || !dayjs.isDayjs(endDate)) {
          console.error(
            "Error: selectedDates contains invalid Dayjs objects",
            selectedDates
          );
          return <p>日付が正しく選択されていません。</p>;
        }
        const dateList = [];
        for (
          let date = startDate;
          date.isBefore(endDate) || date.isSame(endDate, "day");
          date = date.add(1, "day")
        ) {
          dateList.push(date);
        }

        return dateList.map((date) =>
          therapists.map((therapist: Therapist) => (
            <div
              key={therapist.therapist_id}
              style={{
                flexShrink: 0,
                minWidth: "250px",
                display: "inline-block",
              }}
            >
              <Table<TimeSlot>
                className="custom-table"
                columns={modifiedColumns}
                title={() =>
                  `${therapist.username} (${date.format("YYYY-MM-DD")})`
                }
                dataSource={dataSource} 
                pagination={false}
                bordered
                size="small"
                style={{ tableLayout: "fixed", minWidth: "250px" }}
              />
            </div>
          ))
        );
      })()}
    </div>
  );
};

export default TherapistScheduleTable;
