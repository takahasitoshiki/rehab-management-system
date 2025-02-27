import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/pages/Login/Login";
import Scheduling from "@/pages/Main/Main";
import ProtectedRoute from "@/routes/ProtectedRoute"

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ デフォルトページを /login にリダイレクト */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ✅ ログインルート (認証不要) */}
        <Route path="/login" element={<Login />} />

        {/* ✅ 認証が必要なページは ProtectedRoute 内に定義 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/scheduling" element={<Scheduling />} />
        </Route>

        {/* ✅ 存在しないページは /login にリダイレクト */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;