import React, { useState } from "react";
import { Table, Modal, Form, Input, Select, DatePicker } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { scheduleColumns } from "../../../constants/scheduleColumns";
import { generateTimeSlots } from "@/utils/timeSlotGenerator";
import dayjs from "dayjs";

const { Option } = Select;

type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string;
};

const ScheduleList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
  const handleRowDoubleClick = (record: TimeSlot, columnKey?: string) => {
    console.log("クリックした行データ:", record);
    console.log("クリックしたカラム:", columnKey);
    console.log(
      "クリックした時間:",
      columnKey ? record[columnKey as keyof TimeSlot] : "カラムキーが未定義"
    );

    // フォームのデフォルト値を設定
    form.setFieldsValue({
      time: `${record.hour}:${record.minute}`, // クリックした行の時間データをセット
      date: dayjs(), // 予約日を現在の日付に設定
    });

    setIsModalVisible(true);
  };

  return (
    <SectionWrapper>
      <Table<TimeSlot>
        className="custom-table"
        columns={scheduleColumns.map((column) => ({
          ...column,
          onCell: (record: TimeSlot) => ({
            onDoubleClick: () =>
              handleRowDoubleClick(
                record,
                column.dataIndex as string | undefined
              ),
          }),
        }))}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="small"
        style={{ tableLayout: "fixed" }}
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
            rules={[{ required: true, message: "患者名を入力してください。" }]}
          >
            <Input placeholder="患者名を入力" />
          </Form.Item>

          {/* 担当セラピスト */}
          <Form.Item
            name="therapist"
            label="担当セラピスト"
            rules={[
              { required: true, message: "担当セラピストを選択してください。" },
            ]}
          >
            <Select placeholder="セラピストを選択">
              <Option value="therapist1">セラピストA</Option>
              <Option value="therapist2">セラピストB</Option>
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
        </Form>
      </Modal>
    </SectionWrapper>
  );
};

export default ScheduleList;
