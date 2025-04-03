import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Login.css";
import LoginIcon from "@/assets/icon/Login.png";
import { Form, Input, Button, message } from "antd";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth"; // ✅ useAuth を追加
const Login = () => {
    const navigate = useNavigate();
    const { login: setAuth } = useAuth(); // ✅ 認証状態を更新する
    const onFinish = async (values) => {
        try {
            const data = await login(values.username, values.password);
            localStorage.setItem("token", data.token);
            setAuth();
            navigate("/scheduling", { replace: true });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
                message.error("ログインに失敗しました。" + error.message);
            }
            else {
                console.error("Unexpected error:", error);
                message.error("予期しないエラーが発生しました。");
            }
        }
    };
    return (_jsxs("div", { className: "login-container", children: [_jsx("div", { className: "logo-container", children: _jsx("div", { className: "logo", children: _jsx("img", { src: LoginIcon, alt: "Login Icon", style: {
                            height: "200px",
                            width: "200px",
                        } }) }) }), _jsxs(Form, { name: "basic", layout: "vertical", initialValues: { remember: true }, onFinish: onFinish, style: { width: "300px", margin: "0 auto" }, children: [_jsx(Form.Item, { label: "User Name", name: "username", rules: [{ required: true, message: "Please input your username!" }], children: _jsx(Input, { placeholder: "Enter your username" }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: "Please input your password!" }], children: _jsx(Input.Password, { placeholder: "Enter your password" }) }), _jsx(Form.Item, { style: { marginTop: "30px" }, children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "LOGIN" }) })] })] }));
};
export default Login;
