import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login"
import Scheduling from "../pages/Main/Main"

const AppRoutes: React.FC = () =>{
    return (
        <Router>
            <Routes>
                {/* {デフォルトページのルートをログインページにリダイレクト} */}
                <Route path="/" element={<Navigate to="/login" replace />}/>

                {/* ログインルート */}
                <Route path="/login" element={<Login/>}/>

                {/* スケジューリングルート */}
                <Route path="/scheduling" element={<Scheduling/>}/>

            </Routes>
        </Router>
    )
}

export default AppRoutes