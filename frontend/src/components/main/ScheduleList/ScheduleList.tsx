import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";
import dayjs, { Dayjs } from "dayjs";
import TherapistScheduleTable from "@/components/main/TherapistScheduleTable";
import { fetchPatientsList } from "@/api/fetchPatients";
import PatientReservationModal from "@/components/modals/PatientReservationModal";
import { TimeSlot } from "@/types/timeSlot";
import { Therapist } from "@/types/therapists";

export interface Patient {
  _id: string;
  patients_code: string;
  patients_name: string;
  classification: string;
}

interface ScheduleListProps {
  selectedDates: [Dayjs, Dayjs];
  onDropPatient: (timeSlotKey: string, patientName: string) => void;
  dataSource: TimeSlot[];
  setDataSource: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ selectedDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]); // ✅ therapists を追加
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<TimeSlot[]>([]);
  const [droppedPatient, setDroppedPatient] = useState<Patient | null>(null);
  const [selectedTherapistId, setSelectedTherapistId] =
    useState<Therapist | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // ✅ `fetchPatientsList()` と `fetchTherapistList()` を並行処理
        const [patientData, therapistData] = await Promise.all([
          fetchPatientsList(),
          fetchTherapistList(),
        ]);

        if (!Array.isArray(patientData) || !Array.isArray(therapistData)) {
          throw new Error("データが配列ではありません");
        }
        console.log("現在の therapists:", therapists);
        if (!therapists) {
          console.error("❌ therapists が undefined になっています！");
        }

        console.log("取得した患者データ:", patientData);
        console.log("取得したセラピストデータ:", therapistData);

        setPatients(patientData);
        setTherapists(therapistData); // ✅ 修正: `setTherapists` を適用
        setDataSource(generateTimeSlots(therapistData || [])); // ✅ therapists を渡す
      } catch (error) {
        console.error("エラー:", error);
        message.error("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (const minute of [0, 20, 40]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  // ダブルクリック時にモーダルを開く
  const handleRowDoubleClick = (record: TimeSlot) => {
    // フォームのデフォルト値を設定
    form.setFieldsValue({
      time: `${record.hour}:${record.minute}`, // クリックした行の時間データをセット
      date: dayjs(), // 予約日を現在の日付に設定
    });
    setIsModalVisible(true);
  };

  const onDropPatient = (
    timeSlotKey: string,
    patient: Patient,
    therapist: Therapist
  ) => {
    setDataSource((prevData) =>
      prevData.map((slot) =>
        slot.key === timeSlotKey
          ? { ...slot, patient: patient.patients_name }
          : slot
      )
    );
    const droppedSlot = dataSource.find((slot) => slot.key === timeSlotKey) || {
      hour: "00",
      minute: "00",
    };
    if (droppedSlot) {
      form.setFieldsValue({
        time: `${droppedSlot.hour}:${droppedSlot.minute}`,
        date: dayjs(),
      });
    }
    setSelectedTherapistId(therapist); // ✅ Therapist オブジェクトを保存
    setDroppedPatient(patient);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible && droppedPatient) {
      form.setFieldsValue({
        patientName: droppedPatient.patients_name,
        date: dayjs(),
      });
    }
  }, [isModalVisible, droppedPatient, form]);

  console.log("🛠 therapists の現在の状態:", therapists);
  console.log("取得した患者データaaaaa:", JSON.stringify(patients, null, 2));
  return (
    <SectionWrapper>
      {/* TherapistScheduleTable コンポーネントを利用 */}
      <TherapistScheduleTable
        dataSource={dataSource}
        handleRowDoubleClick={handleRowDoubleClick}
        selectedDates={selectedDates}
        onDropPatient={onDropPatient}
        patients={patients} // ✅ 追加

      />

      {/* 予約ダイアログ */}
      <PatientReservationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        patients={patients}
        loading={loading}
        generateTimeOptions={generateTimeOptions}
        selectedTherapist={selectedTherapistId} // ✅ selectedTherapistId を渡す
      />
    </SectionWrapper>
  );
};

export default ScheduleList;
