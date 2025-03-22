// types/Patient.ts
export interface Patient {
  _id?: string;
  patients_code: string;
  patients_name: string;
  disease_name: string;
  classification: string;
  date_of_birth: string; // ISO形式の日付
  gender: string; // "1"（男性）または "2"（女性）
  registration_date: string; // ISO形式の日付
  treatment_plan: string;
  note?: string; // 任意のフィールド
}