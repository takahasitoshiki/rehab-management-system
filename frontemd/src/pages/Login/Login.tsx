import React from "react";
import LoginIcon from "../../img/icon/Login.png";
import { Form, Input, Button } from "antd";
import "./Login.css";

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
