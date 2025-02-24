import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";
import { fetchTherapistList } from "@/services/therapist/fetchTherapist";
import { useDrop } from "react-dnd"; // ✅ useDroppable ではなく useDrop を使用
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
  onDropPatient: (timeSlotKey: string, patientName: Patient) => void;
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,
  selectedDates,
  onDropPatient
}) => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(!therapists.length);

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        const therapistData = await fetchTherapistList();
        if (!Array.isArray(therapistData)) {
          throw new Error("取得したデータが配列ではありません！");
        }
        setTherapists(therapistData);
      } catch (error) {
        console.error("エラー内容:", error);
        message.error("セラピスト情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadTherapists();
  }, []);

  // ✅ 各セルに `useDrop` を適用
  const createDroppableCell = (record: TimeSlot, ) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "PATIENT", // `DraggablePatient` と一致させる
      drop: (item: { patient?: Patient }) => {
        console.log("ドロップされたデータ:", item); // itemの中身を確認
        if (!record || !item.patient) return; // record または patient が undefined なら処理を中断
        onDropPatient(record.key, item.patient); 
        console.log("患者名:"+item.patient.patients_name )
      },
      collect: (monitor) => ({
        
        isOver: !!monitor.isOver(),
      }),
    }));

    return {
      ref: dropRef,
      style: {
        backgroundColor: isOver ? "#f0f0f0" : "white",
      },
      onDoubleClick: () => handleRowDoubleClick(record),
    };
  };

  // ✅ `onCell` の修正
  const modifiedColumns = scheduleColumns.map((column) => ({
    ...column,
    onCell: (record: TimeSlot, index?: number) => ({
      ...(column.onCell ? column.onCell(record, index ?? 0) : {}),
      ...createDroppableCell(record), // ✅ 修正済みの関数を適用
    }),
  }));

  useEffect(() => {
    console.log("📊 現在の dataSource:", dataSource);
  }, [dataSource]);

  useEffect(() => {
    console.log("📊 現在の modifiedColumns:", modifiedColumns);
  }, [modifiedColumns]);

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
          therapists.map((therapist) => (
            <div
              key={`${therapist.therapist_id}-${date.format("YYYY-MM-DD")}`}
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
                loading={loading}
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