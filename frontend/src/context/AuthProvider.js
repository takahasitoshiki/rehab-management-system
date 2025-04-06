import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // ✅ 修正: AuthContext.ts から import
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    // useCallback
    const login = () => {
        setIsAuthenticated(true);
    };
    // ussCallback
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, login, logout }, children: children }));
};
