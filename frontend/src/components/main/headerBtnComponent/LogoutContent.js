import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";
const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            message.success("ログアウトしました。");
            navigate("/login"); // ログインページにリダイレクト
        }
        catch (error) {
            console.error("❌ ログアウトに失敗しました:", error);
            message.error("ログアウトに失敗しました。");
        }
    };
    return (_jsxs("div", { style: { textAlign: "center" }, children: [_jsx("p", { children: "\u672C\u5F53\u306B\u30ED\u30B0\u30A2\u30A6\u30C8\u3057\u307E\u3059\u304B\uFF1F" }), _jsx(Space, { children: _jsx(Button, { danger: true, type: "primary", onClick: handleLogout, children: "\u30ED\u30B0\u30A2\u30A6\u30C8" }) })] }));
};
export default LogoutButton;
