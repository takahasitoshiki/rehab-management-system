import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { generateTimeSlots, TimeSlot } from "@/utils/timeSlotGenerator";
import dayjs, { Dayjs } from "dayjs";
import TherapistScheduleTable from "@/components/main/TherapistScheduleTable";
import { fetchPatientsList } from "@/api/fetchPatients";
import PatientReservationModal from "@/components/modals/PatientReservationModal";

export interface Patient {
  _id: string;
  patients_code: string;
  patients_name: string;
  classification: string;
}

interface ScheduleListProps {
  selectedDates: [Dayjs, Dayjs];
  onDropPatient: (record: TimeSlot, patientName: string) => void;
  dataSource: TimeSlot[];
  setDataSource: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ selectedDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<TimeSlot[]>(generateTimeSlots());
  const [droppedPatient, setDroppedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const data = await fetchPatientsList();
        if (!Array.isArray(data)) throw new Error("データが配列ではありません");
        setPatients(data);
      } catch (error) {
        console.error("エラー:", error);
        message.error("患者情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
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
  // ✅ モーダルを開く共通関数
  const openReservationModal = (record: TimeSlot, patient?: Patient) => {
    form.setFieldsValue({
      time: `${record.hour}:${record.minute}`,
      date: record.date ? dayjs(record.date) : dayjs(), // ✅ 正しい日付をセット
    });

    console.log("選択された日付:", record.date);

    if (patient) {
      setDroppedPatient(patient); // ✅ 患者情報がある場合のみセット
    } else {
      setDroppedPatient(null); // ✅ クリック時は患者情報なし
    }

    setIsModalVisible(true);
  };

  // ✅ クリック時の処理
  const handleRowDoubleClick = (record: TimeSlot) => {
    console.log("🟢 handleRowDoubleClick 呼び出し - record:", record);
    openReservationModal(record);
  };

  // ✅ 患者をドロップした時の処理
  const onDropPatient = (record: TimeSlot, patient: Patient) => {
    console.log("🟢 onDropPatient 呼び出し - record:", record);
    console.log("🟢 onDropPatient 呼び出し - patient:", patient);
    setDataSource((prevData) =>
      prevData.map((slot) =>
        slot.key === record.key
          ? { ...slot, patient: patient.patients_name }
          : slot
      )
    );

    openReservationModal(record, patient);
  };

  useEffect(() => {
    if (isModalVisible && droppedPatient) {
      form.setFieldsValue({
        patientName: droppedPatient.patients_name,
        date: dayjs(),
      });
    }
  }, [isModalVisible, droppedPatient, form]);

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
      />
    </SectionWrapper>
  );
};

export default ScheduleList;
