import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, message } from "antd";

import { scheduleColumns } from "@/constants/scheduleColumns";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { useDrop } from "react-dnd";
import { RootState, AppDispatch } from "@/store";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

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
  onDropPatient: (record: TimeSlot, patientName: Patient) => void;
  patients: Patient[]; // ✅ 追加
}

interface Reservation {
  reservation_id: string;
  therapist_id: string;
  date: string;
  time: string;
  patient?: Patient;
  patient_code: string; // ✅ `patient_code` を追加

}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,
  selectedDates,
  onDropPatient,
  patients,
}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const therapists = useSelector(
    (state: RootState) => state.therapists.therapists
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTherapists());
  }, [dispatch]);

  // ✅ 予約データを取得
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/reservation/search"
        );
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("予約データが配列ではありません！");
        }
        setReservations(data);
      } catch (error) {
        console.error("エラー:", error);
        message.error("予約データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const getTherapistSchedule = (therapistId: string, date: Dayjs) => {
    const schedule = dataSource.map((slot) => {
      const reservation = reservations.find((res) => {
        const resTherapistId = res.therapist_id.trim().toUpperCase();
        const resDate = dayjs(res.date).format("YYYY-MM-DD");
        const resTime = res.time.padStart(5, "0");

        return (
          resTherapistId === therapistId.trim().toUpperCase() &&
          resDate === date.format("YYYY-MM-DD") &&
          resTime ===
            `${slot.hour.padStart(2, "0")}:${slot.minute.padStart(2, "0")}`
        );
      });

      // 🔥 修正: `patient_code` しかない場合、`patients` から補完
      const patientData = Array.isArray(patients)
        ? patients.find((p) => p.patients_code === reservation?.patient_code)
        : undefined;

      const patientName = patientData ? patientData.patients_name : "";
      return {
        ...slot,
        therapist_id: therapistId, // ✅ therapist_id をセット
        patient: patientName,
        date: date.format("YYYY-MM-DD"),
      };
    });

    return schedule;
  };

  // ✅ 各セルに `useDrop` を適用
  const createDroppableCell = (record: TimeSlot) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "PATIENT",
      drop: (item: { patient?: Patient }) => {
        if (!record || !item.patient) return;
        onDropPatient(record, item.patient);
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
    onCell: (record: TimeSlot, index?: number) => ({
      ...(column.onCell ? column.onCell(record, index ?? 0) : {}),
      ...createDroppableCell({
        ...record,
        therapist_id: record.therapist_id, // ✅ 追加
        patient: record.patient ?? "", // ✅ `null` の場合は `""` に変換
      }),
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
                dataSource={getTherapistSchedule(therapist.therapist_id, date)} // ✅ 修正済み
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
