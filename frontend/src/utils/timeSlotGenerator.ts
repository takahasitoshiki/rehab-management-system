
import { Reservation } from "@/api/fetchReservation"; 


export interface TimeSlot {
  key: string;
  hour: string;
  minute: string;
  patient: string | null;
  date?: string; 
  therapist_id:string| null;
  reservations?: Reservation[]; // 配列を追加
  rowSpan?: number; // ✅ 追加
}

export const generateTimeSlots = (): TimeSlot[] => {
  const startHour = 9;
  const endHour = 17;
  const timeSlots: TimeSlot[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 20, 40]) {
      timeSlots.push({
        key: `${hour}-${minute}`,
        hour: hour.toString().padStart(2, "0"),
        minute: minute.toString().padStart(2, "0"),
        patient: null,
        therapist_id:"",
      });
    }
  }

  return timeSlots;
};
