import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { useDispatch, useSelector } from "react-redux";
import { getReservations, selectReservations, selectReservationsLoading, } from "@/store/slices/reservationSlice";
import { selectSelectedDates } from "@/store/slices/dateSlice";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Table } from "antd";
import { createScheduleColumns } from "@/constants/scheduleColumns";
dayjs.extend(isBetween);
const TherapistScheduleTable = ({ dataSource, handleRowDoubleClick, onDropPatient, patients, }) => {
    const selectedDates = useSelector(selectSelectedDates); // ✅ Redux から selectedDates を取得
    const reservations = useSelector(selectReservations);
    const loading = useSelector(selectReservationsLoading);
    const therapists = useSelector((state) => state.therapists.therapists);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTherapists());
        dispatch(getReservations());
    }, [dispatch]);
    const groupTimeSlots = (slots) => {
        const grouped = {};
        slots.forEach((slot) => {
            const key = `${slot.hour}-${slot.minute}`;
            grouped[key] = [...(grouped[key] || []), slot];
        });
        const hourGroups = slots.reduce((acc, slot) => {
            acc[slot.hour] = (acc[slot.hour] || 0) + 1;
            return acc;
        }, {});
        const hourSpanUsed = {};
        const minuteSpanUsed = {};
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
    const getTherapistSchedule = (therapistId, date) => {
        const schedule = [];
        dataSource.forEach((slot) => {
            const matchingReservations = reservations.filter((res) => res.therapist_id.trim().toUpperCase() ===
                therapistId.trim().toUpperCase() &&
                dayjs(res.date).isSame(date, "day") &&
                res.time.padStart(5, "0") ===
                    `${slot.hour.padStart(2, "0")}:${slot.minute.padStart(2, "0")}`);
            if (matchingReservations.length > 0) {
                matchingReservations.forEach((reservation, idx) => {
                    const patient = patients?.find((p) => p.patients_code === reservation.patient_code);
                    schedule.push({
                        ...slot,
                        key: `${slot.hour}-${slot.minute}-${idx}`,
                        patient: patient?.patients_name || "",
                        therapist_id: therapistId,
                        date: date.format("YYYY-MM-DD"),
                        reservations: [reservation],
                    });
                });
            }
            else {
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
    return (_jsx("div", { style: { display: "flex", overflowX: "auto" }, children: selectedDates &&
            therapists &&
            therapists.length > 0 &&
            selectedDates.map((date) => therapists.map((therapist) => (_jsx("div", { style: {
                    flexShrink: 0,
                    minWidth: "250px",
                    display: "inline-block",
                }, children: _jsx(Table, { className: "custom-table", columns: columns, title: () => `${therapist.username} (${date.format("YYYY-MM-DD")})`, dataSource: getTherapistSchedule(therapist.therapist_id, date), loading: loading, pagination: false, bordered: true, size: "small", onRow: (record) => ({
                        onDoubleClick: () => handleRowDoubleClick(record),
                    }), style: { tableLayout: "fixed", minWidth: "250px" } }) }, `${therapist.therapist_id}-${date.format("YYYY-MM-DD")}`)))) }));
};
export default TherapistScheduleTable;
