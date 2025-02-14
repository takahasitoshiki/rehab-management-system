import React, { useState,useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";
import dayjs, { Dayjs } from "dayjs";
import TherapistScheduleTable from "@/components/main/TherapistScheduleTable";
import { fetchPatientsList } from "@/services/patients/fetchPatients";

interface Patient {
  _id: string;
  patients_code: string;
  patients_name: string;
  classification: string;
}

const { Option } = Select;

type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string;
};

interface ScheduleListProps {
  selectedDates: [Dayjs, Dayjs]; // ✅ 受け取る
}

const AchievementList: React.FC<ScheduleListProps> = ({ selectedDates }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

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

  // データソース
  const dataSource: TimeSlot[] = generateTimeSlots();

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

  return (
    <SectionWrapper>
      {/* ✅ TherapistScheduleTable コンポーネントを利用 */}
      <TherapistScheduleTable
        dataSource={dataSource}
        handleRowDoubleClick={handleRowDoubleClick}
        selectedDates={selectedDates}
      />

      {/* 予約ダイアログ */}
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
                <Option key={patient._id} value={patient.patients_name}>
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
            rules={[
              { required: true, message: "予約時間を選択してください。" },
            ]}
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
          <Form.Item name="remarks" label="備考" rules={[{ required: false }]}>
            <Input placeholder="例：本日のリハビリ内容" />
          </Form.Item>
        </Form>
      </Modal>
    </SectionWrapper>
  );
};

export default AchievementList;
