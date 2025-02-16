// ✅ `AuthContext.ts` に Context のみ定義
import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});