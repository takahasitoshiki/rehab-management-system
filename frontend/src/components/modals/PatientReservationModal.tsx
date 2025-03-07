import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  FormInstance,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/ja_JP";
import "dayjs/locale/ja";
import { Reservation, createReservation } from "@/api/fetchReservation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { useEffect } from "react";


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
  const dispatch = useDispatch<AppDispatch>();
  const therapists = useSelector(
    (state: RootState) => state.therapists.therapists
  );
  // セラピスト一覧を取得
  useEffect(() => {
    if (therapists.length === 0) {
      dispatch(fetchTherapists());
    }
  }, [dispatch, therapists.length]);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const requestData: Reservation = {
        patient_code:
          patients.find((p) => p.patients_name === values.patientName)
            ?.patients_code || "",
        therapist_id: values.therapist_id || null, // ✅ form から取得
        date: values.date.format("YYYY-MM-DD"),
        time: values.time,
        note: values.remarks || "",
      };

      console.log("選択したセラピスト:" + therapists[0].therapist_id);
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
        {/* セラピスト */}
        <Form.Item
          name="therapist_id"
          label="セラピスト"
          rules={[
            { required: true, message: "セラピストを選択してください。" },
          ]}
        >
          <Select placeholder="セラピストを選択">
            {therapists.map((therapist) => (
              <Option
                key={therapist.therapist_id}
                value={therapist.therapist_id}
              >
                {therapist.username} {/* ここは適切な名前プロパティに変更 */}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
          <DatePicker style={{ width: "100%" }} locale={locale} />
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
