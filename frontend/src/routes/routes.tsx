import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Scheduling from "../pages/Main/Main";
// import PrivateRoute from "../components/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* {デフォルトページのルートをログインページにリダイレクト} */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ログインルート */}
        <Route 
        // element={<PrivateRoute />}
        >
          <Route path="/login" element={<Login />} />
        </Route>

        {/* スケジューリングルート */}
        <Route path="/scheduling" element={<Scheduling />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
