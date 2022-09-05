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

 
  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        setActive,
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
