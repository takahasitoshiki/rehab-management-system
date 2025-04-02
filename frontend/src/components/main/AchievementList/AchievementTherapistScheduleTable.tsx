import React, { useEffect } from "react";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedReservations,
  selectReservationsLoading,
} from "@/store/slices/reservationSlice";
import { selectSelectedDates } from "@/store/slices/dateSlice";
import { RootState, AppDispatch } from "@/store";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Table } from "antd";
import { createScheduleColumns } from "@/constants/AchievementScheduleColumns";
import { Therapist } from "@/types/therapists";
import { Patient } from "@/types/patient";
import { Reservation } from "@/types/reservation";
import { TimeSlot } from "@/utils/timeSlotGenerator";

dayjs.extend(isBetween);

interface AchievementTherapistScheduleTableProps {
  dataSource: TimeSlot[];
  handleRowDoubleClick: (record: TimeSlot) => void;
  onDropPatient: (record: TimeSlot, patient: Patient, updatedReservations: Reservation[]) => void;
  patients: Patient[];
}

const AchievementTherapistScheduleTable: React.FC<
  AchievementTherapistScheduleTableProps
> = ({ dataSource, handleRowDoubleClick, onDropPatient, patients }) => {
  const selectedDates = useSelector(selectSelectedDates); // Redux から selectedDates を取得
  const loading = useSelector(selectReservationsLoading);
  const therapists = useSelector(
    (state: RootState) => state.therapists.therapists
  );
  const dispatch = useDispatch<AppDispatch>();

  const completedReservations = useSelector(
    (state: RootState) => state.reservations.completedReservations
  );

  useEffect(() => {
    dispatch(fetchTherapists());

    if (completedReservations.length === 0) {
      dispatch(getCompletedReservations()); 
    }
  }, [dispatch, completedReservations.length]);

  const groupTimeSlots = (slots: TimeSlot[]) => {
    const grouped: Record<string, TimeSlot[]> = {};
    slots.forEach((slot) => {
      const key = `${slot.hour}-${slot.minute}`;
      grouped[key] = [...(grouped[key] || []), slot];
    });

    const hourGroups = slots.reduce<Record<string, number>>((acc, slot) => {
      acc[slot.hour] = (acc[slot.hour] || 0) + 1;
      return acc;
    }, {});

    const hourSpanUsed: Record<string, boolean> = {};
    const minuteSpanUsed: Record<string, boolean> = {};

    return slots.map((slot) => {
      const key = `${slot.hour}-${slot.minute}`;
      const result = {
        ...slot,
        hourRowSpan: hourSpanUsed[slot.hour] ? 0 : hourGroups[slot.hour],
        minuteRowSpan: minuteSpanUsed[key] ? 0 : grouped[key].length,
      };

      hourSpanUsed[slot.hour] = true;
      minuteSpanUsed[key] = true;

      return result;
    });
  };

  const getTherapistSchedule = (therapistId: string, date: Dayjs) => {
    const schedule: TimeSlot[] = [];

    dataSource.forEach((slot) => {
      const matchingReservations = completedReservations.filter(
        (res) =>
          res.therapist_id.trim().toUpperCase() ===
            therapistId.trim().toUpperCase() &&
          dayjs(res.date).isSame(date, "day") &&
          res.time.padStart(5, "0") ===
            `${slot.hour.padStart(2, "0")}:${slot.minute.padStart(2, "0")}`
      );

      if (matchingReservations.length > 0) {
        matchingReservations.forEach((reservation, idx) => {
          const patient = patients?.find(
            (p) => p.patients_code === reservation.patient_code
          );
          schedule.push({
            ...slot,
            key: `${slot.hour}-${slot.minute}-${idx}`,
            patient: patient?.patients_name || "",
            therapist_id: therapistId,
            date: date.format("YYYY-MM-DD"),
            reservations: [reservation],
          });
        });
      } else {
        schedule.push({
          ...slot,
          key: `${slot.hour}-${slot.minute}-empty`,
          patient: "",
          therapist_id: therapistId,
          date: date.format("YYYY-MM-DD"),
          reservations: [],
        });
      }
    });

    return groupTimeSlots(schedule);
  };

  const columns = createScheduleColumns(onDropPatient);
  return (
    <div style={{ display: "flex", overflowX: "auto" }}>
      {selectedDates &&
        therapists &&
        therapists.length > 0 &&
        selectedDates.map((date: Dayjs) =>
          therapists.map((therapist: Therapist) => (
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
                columns={columns}
                title={() =>
                  `${therapist.username} (${date.format("YYYY-MM-DD")})`
                }
                dataSource={getTherapistSchedule(therapist.therapist_id, date)}
                loading={loading}
                pagination={false}
                bordered
                size="small"
                onRow={(record) => ({
                  onDoubleClick: () => handleRowDoubleClick(record),
                })}
                style={{ tableLayout: "fixed", minWidth: "250px" }}
              />
            </div>
          ))
        )}
    </div>
  );
};

export default AchievementTherapistScheduleTable;
