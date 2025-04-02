import { Patient } from "@/types/patient";

export interface Reservation {
  _id?: string; 
  patient_code: string;
  therapist_id: string;
  date: string;
  time: string;
  note?: string; 
  completed?: boolean; 
  rehabilitation_details?: string; 
  patient?: Patient;
  reported?: boolean; 
}