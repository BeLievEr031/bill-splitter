import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { DataContext } from "../context/DataContextProvider";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const isLogin = window.localStorage.getItem("isLogin");
  useEffect(() => {
    if (!user && !isLogin) {
      navigate("/");
      return;
    }
  }, []);

  return <>{children}</>;
}

export default PrivateRoute;
