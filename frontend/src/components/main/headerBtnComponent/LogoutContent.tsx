import React from "react";
import { Button, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("ログアウトしました。");
      navigate("/login"); // ログインページにリダイレクト
    } catch (error) {
      console.error(" ログアウトに失敗しました:", error);
      message.error("ログアウトに失敗しました。");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p role="alert">本当にログアウトしますか？</p>
      <Space>
        <Button danger type="primary" onClick={handleLogout}>
          ログアウト
        </Button>
      </Space>
    </div>
  );
};

export default LogoutButton;
