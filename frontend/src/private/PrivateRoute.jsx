import React from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const user = true;

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, []);

  return <>{children}</>;
}

export default PrivateRoute;
