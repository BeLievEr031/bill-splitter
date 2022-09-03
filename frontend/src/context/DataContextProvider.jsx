import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const DataContext = createContext();
function DataContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("home");
  const [memberArr, setMemberArr] = useState([]);
  const [glbGroup, setGlbGroup] = useState([
    {
      name: "abc",
      desc: "group 1",
      expense: 500,
      members: 4,
    },
    {
      name: "xyz",
      desc: "group 2",
      expense: 5500,
      members: 41,
    },
    {
      name: "doe",
      desc: "group 3",
      expense: 1500,
      members: 45,
    },
    {
      name: "ds",
      desc: "wd",
      expense: 500,
      members: 4,
    },
    {
      name: "wqde",
      desc: "ef",
      expense: 500,
      members: 4,
    },
    {
      name: "ef",
      desc: "ee",
      expense: 500,
      members: 4,
    },
  ]);

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

      console.log(response.data);
      setMemberArr([...memberArr, { ...response.data.profile }]);
      setGroupArr([...groupArr, ...response.data.profile.group]);
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
        glbGroup,
        groupArr,
        setGroupArr,
        memberArr,
        setMemberArr,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
