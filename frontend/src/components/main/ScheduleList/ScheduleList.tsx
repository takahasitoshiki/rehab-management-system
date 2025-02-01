import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { scheduleColumns } from "../../../constants/scheduleColumns";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";
import { fetchTherapistList } from "@/services/therapist/fetchTherapist";
import dayjs from "dayjs";

const { Option } = Select;

type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string;
};

interface Therapist {
  therapist_id: string;
  username: string;
}

const ScheduleList: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // データソース
  const dataSource: TimeSlot[] = generateTimeSlots();

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        const therapistData = await fetchTherapistList();
        console.log("取得したセラピストデータ:", therapistData);
        if (!Array.isArray(therapistData)) {
          throw new Error("取得したデータが配列ではありません！");
        }
        setTherapists(therapistData);
      } catch (error) {
        console.error("エラー内容:", error);
        message.error("セラピスト情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadTherapists();
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

  return (
    <SectionWrapper>
      <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}>
      {therapists.map((therapist) => (
          <div key={therapist.therapist_id}>
            <Table<TimeSlot>
              className="custom-table"
              columns={scheduleColumns.map((column) => ({
                ...column,
                onCell: (record: TimeSlot) => ({
                  onDoubleClick: () =>
                    handleRowDoubleClick(
                      record,
                    ),
                }),
              }))}
              title={() => `${therapist.username}`} 
              dataSource={dataSource}
              loading={loading}
              pagination={false}
              bordered
              size="small"
              style={{ tableLayout: "fixed" }}
            />
          </div>
        ))}
      </div>

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

export default ScheduleList;
