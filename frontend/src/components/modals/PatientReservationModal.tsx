import React from "react";
import { Modal, Form, Input, Select, DatePicker, FormInstance } from "antd";

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
}

const { Option } = Select;

const PatientReservationModal: React.FC<PatientReservationModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  form,
  patients,
  loading,
  generateTimeOptions,
}) => {
  return (
    <Modal
      title="患者予約"
      open={isModalVisible}
      onOk={() => setIsModalVisible(false)}
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