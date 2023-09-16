import { useState, createContext } from "react";

export const AuthContext = createContext({
  token: "",
  role: "",
  firstName: "",
  lastName: "",
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");
  const storedFirstName = localStorage.getItem("firstname");
  const storedLastName = localStorage.getItem("lastname");
  const [token, setToken] = useState(storedToken || "");
  const [role, setRole] = useState(storedRole || "");
  const [firstName, setFirstName] = useState(storedFirstName || "");
  const [lastName, setLastName] = useState(storedLastName || "");
  const login = (data) => {
    setToken(data.id.toString());
    setFirstName(data.firstname);
    setLastName(data.lastname);
    localStorage.setItem("token", data.id.toString());
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("lastname", data.lastname);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    setRole("");
  };

  const specifyRole = (value) => {
    setRole(value);
    localStorage.setItem("role", value);
  };
  const removeRole = () => {
    setRole("");
    localStorage.removeItem("role");
  };

  const value = {
    token,
    role,
    firstName,
    lastName,
    login,
    logout,
    specifyRole,
    removeRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
