import React from "react";
import "./SignUp.css";
import LoginIcon from "@/assets/icon/Login.png";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Therapist, createTherapist } from "@/api/fetchTherapist";

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: Therapist) => {
    try {
      const response = await createTherapist(values);
      console.log("登録されたセラピスト情報:", response);
      form.resetFields();
    } catch (error) {
      console.error("登録エラー:" + error);
      message.error("セラピスト情報の登録に失敗しました。");
    }
    message.success("新規登録が完了しました！");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo">
          <img
            src={LoginIcon}
            alt="SignUp Icon"
            style={{
              height: "200px",
              width: "200px",
            }}
          />
        </div>
      </div>
      <Form
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "300px", margin: "0 auto" }}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            { required: true, message: "ユーザー名を入力してください。" },
          ]}
        >
          <Input placeholder="ユーザー名を入力" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "パスワードを入力してください。" },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="パスワードを入力" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "確認用パスワードを入力してください。" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("パスワードが一致しません。"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="もう一度パスワードを入力" />
        </Form.Item>
        <Form.Item style={{ marginTop: "30px" }}>
          <Button type="primary" htmlType="submit" block>
            SIGNUP
          </Button>
          <Button
            type="default"
            block
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
