import { Patient } from "@/types/patient";

export interface Reservation {
  _id?: string; // ✅ MongoDB の `_id` (予約作成時には不要)
  patient_code: string;
  therapist_id: string;
  date: string;
  time: string;
  note?: string; // ✅ デフォルト ""
  completed?: boolean; // ✅ デフォルト false
  rehabilitation_details?: string; // ✅ デフォルト ""
  patient?: Patient;
  reported?: boolean; // ✅ デフォルト false
}