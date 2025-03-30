import React from "react";
import { Form, Input,  Button, message, Row, Col } from "antd";
import { Therapist, createTherapist } from "@/api/fetchTherapist";
import { useDispatch } from "react-redux";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import { AppDispatch } from "@/store";


interface TherapistRegistrationContentProps {
  onClose: () => void;
}

const TherapistRegistrationContent: React.FC <TherapistRegistrationContentProps>= ({onClose}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async (values: Therapist) => {
    try{
      const response = await createTherapist(values);
      console.log("登録されたセラピスト情報:", response);
      // 成功メッセージを表示
      message.success("セラピスト情報が登録されました。")
      form.resetFields();
      await dispatch(fetchTherapists());
      onClose();
    }catch(error){
      console.error("登録エラー:"+ error)
      message.error("セラピスト情報の登録に失敗しました。");
    }
  };

  return (
    <div>
      <h3>セラピスト登録</h3>
      <p>以下のフォームにセラピストの情報を入力してください。</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>

          {/* ユーザー名 */}
          <Col span={12}>
            <Form.Item
              name="username"
              label="ユーザー名"
              rules={[{ required: true, message: "セラピスト名を入力してください" }]}
            >
              <Input placeholder="例: 田中 太郎" />
            </Form.Item>
          </Col>

          {/* パスワード */}
          <Col span={12}>
            <Form.Item
              name="password"
              label="パスワード"
              rules={[{ required: true, message: "パスワードを入力してください" }]}
            >
              <Input.Password placeholder="例: password" />
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

export default TherapistRegistrationContent;