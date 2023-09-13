import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/" replace={true} />;
  } else return children;
};

export default ProtectRoutes;
