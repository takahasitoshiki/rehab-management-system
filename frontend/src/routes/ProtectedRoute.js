import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
const ProtectedRoute = () => {
    const { isAuthenticated, login } = useAuth();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            login(); // ✅ ログイン状態を更新
        }
        setTimeout(() => setIsAuthChecked(true), 50); // ✅ login() の更新を確実に反映
    }, [login]); // ✅ 依存配列に login のみを入れる
    if (!isAuthChecked)
        return null; // ✅ 認証チェックが完了するまで画面を非表示にする
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
};
export default ProtectedRoute;
