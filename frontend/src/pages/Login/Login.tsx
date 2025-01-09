import React from "react";
import LoginIcon from "../../img/icon/Login.png";
import { Form, Input, Button } from "antd";
import { login } from "../../sesrvies/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: {username: string; password: string}) => {
    try{
      const data = await login(values.username, values.password);
      localStorage.setItem("token", data.token) //トークン保存
      console.log("Login successful:", data);
      navigate("/scheduling"); // ページ遷移
    } catch (error: any ){
      console.error("Login failed:", error.response?.data || error.message)
    }
    };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        onFinishFailed={onFinishFailed}
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
