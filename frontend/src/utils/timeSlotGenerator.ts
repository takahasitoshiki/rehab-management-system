import { TimeSlot } from "@/types/timeSlot";

interface Therapist {
  therapist_id: string;
  username: string;
}
  export const generateTimeSlots = (therapists: Therapist[] = []): TimeSlot[]=> {
    const startHour = 9;
    const endHour = 17;
    const timeSlots: TimeSlot[] = [];
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 20, 40]) {
        therapists.forEach((therapist) => {
        timeSlots.push({
          key: `${therapist.therapist_id}-${hour}-${minute}`, // ✅ ユニークなキー
          hour: hour.toString().padStart(2, "0"),
          minute: minute.toString().padStart(2, "0"),
          patient: "",
          therapist_id: therapist.therapist_id, // ✅ therapist_id を追加
        });
        });
      }
    }
  
    return timeSlots;
  };