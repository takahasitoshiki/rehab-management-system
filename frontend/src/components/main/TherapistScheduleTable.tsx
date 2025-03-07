import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { getReservations, selectReservations, selectReservationsLoading } from "@/store/slices/reservationSlice";
import { RootState, AppDispatch } from "@/store";
import { useDrop } from "react-dnd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Table } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";
import { TimeSlot } from "@/utils/timeSlotGenerator";
import { Therapist } from "@/types/therapists";
import { Patient } from "@/types/Patient";

dayjs.extend(isBetween);

interface TherapistScheduleTableProps {
  dataSource: TimeSlot[];
  handleRowDoubleClick: (record: TimeSlot) => void;
  selectedDates: [Dayjs, Dayjs] | null;
  onDropPatient: (record: TimeSlot, patientName: Patient) => void;
  patients: Patient[]; // ✅ 追加
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,
  selectedDates,
  onDropPatient,
  patients,
}) => {
  const reservations = useSelector(selectReservations); 
  const loading = useSelector(selectReservationsLoading); 
  const therapists = useSelector(
    (state: RootState) => state.therapists.therapists
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTherapists());
    dispatch(getReservations()); // ✅ Redux で予約データ取得
  }, [dispatch]);


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

    return {
      ref: dropRef,
      style: {
        backgroundColor: isOver ? "#f0f0f0" : "white",
      },
      onDoubleClick: () => handleRowDoubleClick(record),
    };
  };


  const modifiedColumns = scheduleColumns.map((column) => ({
    ...column,
    onCell: (record: TimeSlot, index?: number) => ({
      ...(column.onCell ? column.onCell(record, index ?? 0) : {}),
      ...createDroppableCell(record),
    }),
  }));

  
  const onRowClick = (record: TimeSlot) => ({
    onDoubleClick: () => handleRowDoubleClick(record),
  });


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
                onRow={onRowClick} // ✅ 追加
              />
            </div>
          ))
        );
      })()}
    </div>
  );
};

export default TherapistScheduleTable;
