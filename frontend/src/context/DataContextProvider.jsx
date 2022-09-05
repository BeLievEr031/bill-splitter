import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
const DataContext = createContext();
function DataContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [active, setActive] = useState("home");
  const [memberArr, setMemberArr] = useState([]);
  const [glbCurrGrpMemberArr, setGlbCurrGrpMemberArr] = useState([]);
  const [groupArr, setGroupArr] = useState([]);

  const handleActive = () => {
    if (active === "home") {
      setActive("group");
    } else {
      setActive("home");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/profile`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      console.log(response.data.profile.group);
      setMemberArr([...memberArr, { ...response.data.profile }]);
      setGroupArr([...groupArr, ...response.data.profile.group]);
    }

    fetchData();
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
  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        handleActive,
        groupArr,
        setGroupArr,
        memberArr,
        setMemberArr,
        glbCurrGrpMemberArr,
        setGlbCurrGrpMemberArr,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
