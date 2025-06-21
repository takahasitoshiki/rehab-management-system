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
import { createReservation, updateReservation } from "@/api/fetchReservation";
import { getReservations, getCompletedReservations } from "@/store/slices/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { Reservation } from "@/types/reservation";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Patient } from "@/types/patient";


interface PatientReservationModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  form: FormInstance;
  patients: Patient[];
  loading: boolean;
  generateTimeOptions: () => string[];
  droppedPatient?: Patient | null;
  editingReservation?: Reservation | null; 
}

const { Option } = Select;

const PatientReservationModal: React.FC<PatientReservationModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  form,
  patients,
  loading,
  generateTimeOptions,
  editingReservation,
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

  useEffect(() => {
    if (editingReservation) {
      //編集モードのとき
      form.setFieldsValue({
        therapist_id: editingReservation.therapist_id, // セラピストID
        patientName:editingReservation.patient_code, // 患者名
        date: editingReservation.date ? dayjs(editingReservation.date) : null, // 日付
        time: editingReservation.time, // 時間
        remarks: editingReservation.note, // 備考
        completed: editingReservation.completed, // 完了ステータス
        rehabilitation_details: editingReservation.rehabilitation_details, // リハビリ内容
      });
    } 
  }, [editingReservation, form, patients]); // 依存配列

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const requestData: Reservation = {
        _id: editingReservation?._id || undefined, 
        patient_code:values.patient_code, 
        therapist_id: values.therapist_id,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time,
        note: values.remarks || "",
        completed: values.completed, 
        rehabilitation_details: values.rehabilitation_details,
      };
  
      if (editingReservation) {
        await updateReservation(requestData); 
        message.success("予約が更新されました");
      } else {
        await createReservation(requestData); 
        message.success("予約が登録されました");
      }
      // 予約リストを全て取り直す
      dispatch(getReservations());
      dispatch(getCompletedReservations()); 
      
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("予約の登録/更新に失敗しました");
    }
  };

  return (
    <Modal
      title={editingReservation ? "予約編集" : "患者予約"} 
      open={isModalVisible}
      onOk={onSubmit}
      onCancel={() => setIsModalVisible(false)}
      okText={editingReservation ? "更新" : "予約"} 
      cancelText="キャンセル"
    >
      <Form form={form} layout="vertical">
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
                {therapist.username} 
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 患者名 */}
        <Form.Item
          name="patient_code"
          label="患者名"
          rules={[{ required: true, message: "患者名を選択してください" }]}
        >
          <Select placeholder="患者名" loading={loading}>
            {patients.map((patient) => (
              <Option key={patient.patients_code} value={patient.patients_code}>
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

        {/*リハビリ内容 */}
        <Form.Item name="rehabilitation_details" label="リハビリ内容">
          <Input.TextArea placeholder="リハビリの詳細を入力" />
        </Form.Item>

        {/*完了ステータス */}
        <Form.Item name="completed" label="完了ステータス" initialValue={false}>
          <Select placeholder="完了状態を選択">
            <Option value={false}>未完了</Option>
            <Option value={true}>完了</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PatientReservationModal;
