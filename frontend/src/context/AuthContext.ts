import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

//  React Fast Refresh の警告を回避するため、コンテキストだけを定義
export const AuthContext = createContext<AuthContextType | undefined>(undefined);