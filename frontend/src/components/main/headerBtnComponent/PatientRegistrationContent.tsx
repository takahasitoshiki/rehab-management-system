import React from "react";
import { Form, Input, Select, DatePicker, Button, message, Row, Col } from "antd";
import dayjs from "dayjs";
import { Patient, fetchPatientsRegister } from "@/services/patients/fetchPatients";


const { Option } = Select;

const PatientRegistrationContent: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: Patient) => {
    try{
      const response = await fetchPatientsRegister(values);
      console.log("登録された患者情報:", response);
      // 成功メッセージを表示
      message.success("患者情報が登録されました。")
      form.resetFields();
    }catch(error){
      console.error("登録エラー:"+ error)
      message.error("患者情報の登録に失敗しました。");
    }
  };

  return (
    <div>
      <h3>患者登録</h3>
      <p>以下のフォームに患者の情報を入力してください。</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          registration_date: dayjs(), // 今日の日付を初期値として設定
          date_of_birth: dayjs("2000-01-01"), // 生年月日を2000/1/1に設定
          gender: "",
          classification: "",
        }}
      >
        <Row gutter={16}>

          {/* 患者名 */}
          <Col span={12}>
            <Form.Item
              name="patients_name"
              label="患者名"
              rules={[{ required: true, message: "患者名を入力してください" }]}
            >
              <Input placeholder="例: 田中 太郎" />
            </Form.Item>
          </Col>

          {/* 疾患名 */}
          <Col span={12}>
            <Form.Item
              name="disease_name"
              label="疾患名"
              rules={[{ required: true, message: "疾患名を入力してください" }]}
            >
              <Input placeholder="例: 腰痛" />
            </Form.Item>
          </Col>

          {/* 分類 */}
          <Col span={12}>
            <Form.Item
              name="classification"
              label="分類"
              rules={[{ required: true, message: "分類を選択してください" }]}
            >
              <Select placeholder="分類を選択してください">
                <Option value="一般">一般</Option>
                <Option value="緊急">緊急</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* 生年月日 */}
          <Col span={12}>
            <Form.Item
              name="date_of_birth"
              label="生年月日"
              rules={[{ required: true, message: "生年月日を入力してください" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="生年月日を選択" />
            </Form.Item>
          </Col>

          {/* 性別 */}
          <Col span={12}>
            <Form.Item
              name="gender"
              label="性別"
              rules={[{ required: true, message: "性別を選択してください" }]}
            >
              <Select placeholder="性別を選択してください">
                <Option value="1">男性</Option>
                <Option value="2">女性</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* 登録日 */}
          <Col span={12}>
            <Form.Item
              name="registration_date"
              label="登録日"
              rules={[{ required: true, message: "登録日を入力してください" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="登録日を選択" />
            </Form.Item>
          </Col>

          {/* 治療計画 */}
          <Col span={12}>
            <Form.Item
              name="treatment_plan"
              label="治療計画"
              rules={[{ required: true, message: "治療計画を入力してください" }]}
            >
              <Input placeholder="例: 週3回のリハビリ" />
            </Form.Item>
          </Col>

          {/* 備考 */}
          <Col span={24}>
            <Form.Item name="note" label="備考">
              <Input.TextArea placeholder="備考を入力してください (任意)" />
            </Form.Item>
          </Col>
        </Row>

        {/* 登録ボタン */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登録
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PatientRegistrationContent;