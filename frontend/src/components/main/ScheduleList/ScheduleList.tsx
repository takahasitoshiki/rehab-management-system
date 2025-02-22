import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";
import dayjs, { Dayjs } from "dayjs";
import TherapistScheduleTable from "@/components/main/TherapistScheduleTable";
import { fetchPatientsList } from "@/services/patients/fetchPatients";
import PatientReservationModal from "@/components/modals/PatientReservationModal";

interface Patient {
  patients_code: string;
  patients_name: string;
  classification: string;
}

type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string | null;
};

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
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<TimeSlot[]>(generateTimeSlots());
  const [droppedPatient, setDroppedPatient ] = useState< Patient| null>(null)

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

  // ダブルクリック時にモーダルを開く
  const handleRowDoubleClick = (record: TimeSlot) => {
    // フォームのデフォルト値を設定
    form.setFieldsValue({
      time: `${record.hour}:${record.minute}`, // クリックした行の時間データをセット
      date: dayjs(), // 予約日を現在の日付に設定
    });

    setIsModalVisible(true);
  };

  const onDropPatient = (timeSlotKey: string, patient: Patient) => {
    setDataSource((prevData) =>
      prevData.map((slot) =>
        slot.key === timeSlotKey ? { ...slot, patient: patient.patients_name } : slot
      )
    );
      const droppedSlot = dataSource.find((slot) => slot.key === timeSlotKey);
    if (droppedSlot) {
      form.setFieldsValue({
        time: `${droppedSlot.hour}:${droppedSlot.minute}`, 
        date: dayjs(), 
      });
    }
    setDroppedPatient(patient)
    setIsModalVisible(true);
  };

  useEffect(() => {
    if(isModalVisible && droppedPatient){
      form.setFieldsValue({
        patientName:droppedPatient.patients_name,
        date: dayjs(),
      })
    }
  },[isModalVisible, droppedPatient, form])

  return (
    <SectionWrapper>
      {/* TherapistScheduleTable コンポーネントを利用 */}
      <TherapistScheduleTable
        dataSource={dataSource}
        handleRowDoubleClick={handleRowDoubleClick}
        selectedDates={selectedDates}
        onDropPatient={onDropPatient}
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
