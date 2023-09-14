import { useState, createContext } from "react";

export const AuthContext = createContext({
  token: "",
  role: "",
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  console.log(storedToken);
  const [token, setToken] = useState(storedToken || "");
  const [role, setRole] = useState("");
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setRole("");
  };

  const specifyRole = (value) => {
    console.log(value);
    setRole(value);
  };
  const removeRole = () => {
    setRole("");
  };

  const value = {
    token,
    role,
    login,
    logout,
    specifyRole,
    removeRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
