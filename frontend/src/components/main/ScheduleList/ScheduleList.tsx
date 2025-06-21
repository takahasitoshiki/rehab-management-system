import React, { useState, useEffect } from "react";
import { Form } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { generateTimeSlots, TimeSlot } from "@/utils/timeSlotGenerator";
import dayjs from "dayjs";
import TherapistScheduleTable from "@/components/main/ScheduleList/TherapistScheduleTable";
import PatientReservationModal from "@/components/modals/PatientReservationModal";
import { Patient } from "@/types/patient";
import { Reservation } from "@/types/reservation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPatients } from "@/store/slices/patientsSlice";

interface ScheduleListProps {
  onDropPatient: (
    record: TimeSlot,
    patient: Patient,
    updatedReservations: Reservation[]
  ) => void;
  dataSource: TimeSlot[];
  setDataSource: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}
type ModalMode = "create" | "edit";

const ScheduleList: React.FC<ScheduleListProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { patients, loading } = useAppSelector((state) => state.patients);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<TimeSlot[]>(generateTimeSlots());
  const [droppedPatient, setDroppedPatient] = useState<Patient | null>(null);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

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
  //  モーダルを開く共通関数
  const openReservationModal = (
    record: TimeSlot,
    mode: ModalMode,
    patient?: Patient
  ) => {
    // まずはモーダルの表示状態をリセット
    setEditingReservation(null);
    setDroppedPatient(null);
    form.resetFields();

    // 共通フォーム初期値を設定
    form.setFieldsValue({
      time: `${record.hour}:${record.minute}`,
      date: record.date ? dayjs(record.date) : dayjs(),
      therapist_id: record.therapist_id,
    });

    if (mode === "edit") {
      // 編集モードの場合
      if (record.reservations?.length) {
        setEditingReservation(record.reservations[0]);
      }

      // 患者新規追加モードの場合
    } else if (mode === "create") {
      if (patient) {
        setDroppedPatient(patient);
        form.setFieldsValue({
          patient_code: patient.patients_code,
        });
      }
    }
    setIsModalVisible(true);
  };

  const handleRowDoubleClick = (record: TimeSlot) => {
    if (record.reservations?.length) {
      setEditingReservation(record.reservations[0]);
      openReservationModal(record, "edit");
      console.dir("クリックした項目:" + JSON.stringify(record, null, 2));
    }
  };

  //  患者をドロップした時の処理
  const onDropPatient = (record: TimeSlot, patient: Patient) => {
    setDataSource((prevData) =>
      prevData.map((slot) =>
        slot.key === record.key
          ? {
              ...slot,
              patient: patient.patients_name,
              date: record.date ?? dayjs().format("YYYY-MM-DD"),
              therapist_id: record.therapist_id,
            }
          : slot
      )
    );

    openReservationModal(record, "create", patient);
  };

  useEffect(() => {
    if (isModalVisible && droppedPatient) {
      console.log(
        "droppedPatient.patients_name:",
        droppedPatient.patients_name
      );
      form.setFieldsValue({
        patient_code: droppedPatient.patients_code,
      });
    }
  }, [isModalVisible, droppedPatient, dataSource, form]);

  return (
    <SectionWrapper>
      {/* TherapistScheduleTable コンポーネントを利用 */}
      <TherapistScheduleTable
        dataSource={dataSource}
        handleRowDoubleClick={handleRowDoubleClick}
        onDropPatient={onDropPatient}
        patients={patients}
      />

      {/* 予約ダイアログ */}
      <PatientReservationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        patients={patients}
        loading={loading}
        generateTimeOptions={generateTimeOptions}
        editingReservation={editingReservation}
      />
    </SectionWrapper>
  );
};

export default ScheduleList;
