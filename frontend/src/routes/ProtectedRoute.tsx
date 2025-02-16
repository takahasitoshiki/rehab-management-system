import React, { useEffect, useState } from "react";
import { Navigate, Outlet,  useNavigate} from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(); // ✅ ログイン状態を更新
    }
    setIsAuthChecked(true); // ✅ 認証チェック完了
  }, [isAuthenticated, navigate]);

  if (!isAuthChecked) return null; // ✅ 認証チェック完了までレンダリングしない

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;