import { Reservation } from "@/types/reservation";
import { v4 as uuidv4 } from "uuid";

export interface TimeSlot {
  key: string;
  hour: string;
  minute: string;
  patient: string | null;
  date?: string;
  therapist_id: string | null;
  reservations?: Reservation[];
  rowSpan?: number;
  hourRowSpan?: number;
  minuteRowSpan?: number;
}

export const generateTimeSlots = (
  startHour: number = 9,
  endHour: number = 17,
  minutesInterval: number[] = [0, 20, 40]
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of minutesInterval) {
      timeSlots.push({
        key: `
        ${uuidv4()}-${hour}-${minute}`,
        hour: hour.toString().padStart(2, "0"),
        minute: minute.toString().padStart(2, "0"),
        patient: null,
        therapist_id: null, //TODO: null許容なのかを確認する
      });
    }
  }

  console.log("Generated time slots:", timeSlots);
  return timeSlots;
};
