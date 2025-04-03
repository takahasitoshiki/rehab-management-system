import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login" });
};
export default PrivateRoute;
