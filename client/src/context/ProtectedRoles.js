import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedAdmin = ({ children }) => {
  const { user } = useAuthContext();
  const isUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = isUser.role;

  return user && isAdmin === 0 ? children : <Navigate to="/" />;
};

export { ProtectedAdmin };
