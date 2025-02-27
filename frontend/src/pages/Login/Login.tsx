import React from "react";
import "./Login.css";
import LoginIcon from "@/assets/icon/Login.png";
import { Form, Input, Button, message } from "antd";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth"; // ✅ useAuth を追加

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth(); // ✅ 認証状態を更新する

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const data = await login(values.username, values.password);
      localStorage.setItem("token", data.token);
      setAuth();
      navigate("/scheduling", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        message.error("ログインに失敗しました。" + error.message);
      } else {
        console.error("Unexpected error:", error);
        message.error("予期しないエラーが発生しました。");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo">
          <img
            src={LoginIcon}
            alt="Login Icon"
            style={{
              height: "200px",
              width: "200px",
            }}
          />
        </div>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: "300px", margin: "0 auto" }}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item style={{ marginTop: "30px" }}>
          <Button type="primary" htmlType="submit" block>
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;