import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { DataContext } from "../context/DataContextProvider";
import jwt_decode from "jwt-decode";
import axios from "axios";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user, setGroupArr, setUser, memberArr, groupArr, setMemberArr } =
    useContext(DataContext);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!user && !token) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/profile`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (!token) {
        setMemberArr([...memberArr, { ...response.data.profile }]);
        setGroupArr([...groupArr, ...response.data.profile.group]);
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    var decoded = jwt_decode(window.localStorage.getItem("token"));
    async function fetchData() {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/getuser`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: { id: decoded.userID },
      });

      console.log(response.data);
      setUser({
        ...response.data.user,
      });
    }

    fetchData();
  }, []);

  return <>{children}</>;
}

export default PrivateRoute;
