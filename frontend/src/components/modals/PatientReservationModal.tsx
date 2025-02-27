import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, FormInstance, message } from "antd";
import { ReservationRequest, createReservation } from "@/api/fetchReservation"
import dayjs from "dayjs";

interface Therapist {
  therapist_id: string;
  username: string;
}

interface Patient {
  patients_code: string;
  patients_name: string;
}

interface PatientReservationModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  form: FormInstance;
  patients: Patient[];
  loading: boolean;
  generateTimeOptions: () => string[];
  droppedPatient?: Patient | null;
  selectedTherapist: Therapist | null; // ✅ 追加
}

const { Option } = Select;

const PatientReservationModal: React.FC<PatientReservationModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  form,
  patients,
  loading,
  generateTimeOptions,
  droppedPatient,  

}) => {

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const requestData: ReservationRequest = {
        patient_code: patients.find((p) => p.patients_name === values.patientName)?.patients_code || "",
        therapist_id: "PT002", // ✅ 
        date: values.date.format("YYYY-MM-DD"),
        time: values.time,
        note: values.remarks || "",
      };

      await createReservation(requestData); // ✅ 分離したAPI関数を呼び出し
      message.success("予約が登録されました");

      form.resetFields();
      setIsModalVisible(false);
      window.location.reload() 
    } catch (error) {
      console.error(error)
      message.error("予約の登録に失敗しました");
    }
  };
  useEffect(() => {
    console.log("✅ モーダルが開いた (isModalVisible):", isModalVisible);
    console.log("✅ droppedPatient:", droppedPatient); // デバッグ出力
    console.log("✅ therapistId:", selectedTherapist); // ✅ therapistId のデバッグ出力

    if (isModalVisible && droppedPatient) {
      form.setFieldsValue({
        patientName: droppedPatient.patients_name,
        date: dayjs(), // ✅ 日付セット
      });
    }
  }, [isModalVisible, droppedPatient, form]);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const requestData: ReservationRequest = {
        patient_code:
          patients.find((p) => p.patients_name === values.patientName)
            ?.patients_code || "",
        therapist_id: selectedTherapist ?? { therapist_id: "", username: "" }, // ✅ `null` の場合、デフォルト値を設定
        date: values.date.format("YYYY-MM-DD"),
        time: values.time,
        note: values.remarks || "",
      };

      await createReservation(requestData); // ✅ 分離したAPI関数を呼び出し
      message.success("予約が登録されました");

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("予約の登録に失敗しました");
    }
  };

  return (
    <Modal
      title="患者予約"
      open={isModalVisible}
      onOk={onSubmit}
      onCancel={() => setIsModalVisible(false)}
      okText="予約"
      cancelText="キャンセル"
    >
      <Form form={form} layout="vertical">
        {/* 患者名 */}
        <Form.Item
          name="patientName"
          label="患者名"
          rules={[{ required: true, message: "患者名を入力してください" }]}
        >
          <Select placeholder="患者名" loading={loading}>
            {patients.map((patient) => (
              <Option key={patient.patients_code} value={patient.patients_name}>
                {patient.patients_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 予約日 */}
        <Form.Item
          name="date"
          label="予約日"
          rules={[{ required: true, message: "予約日を入力してください。" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* 予約時間（20分単位で選択） */}
        <Form.Item
          name="time"
          label="予約時間"
          rules={[{ required: true, message: "予約時間を選択してください。" }]}
        >
          <Select placeholder="時間を選択">
            {generateTimeOptions().map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 備考 */}
        <Form.Item name="remarks" label="備考">
          <Input placeholder="例：本日のリハビリ内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PatientReservationModal;
