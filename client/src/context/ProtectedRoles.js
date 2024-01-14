import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedAdmin = ({ children }) => {
  // const { user } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.role;

  return isAdmin === 0 ? children : <Navigate to="/" />;
};

export { ProtectedAdmin };
