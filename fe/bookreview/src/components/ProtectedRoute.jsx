import { createContext, useContext, useEffect, useState } from "react";
import api from "../API/axios";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => logout());
  }, []);

  return (
    <AuthCtx.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}