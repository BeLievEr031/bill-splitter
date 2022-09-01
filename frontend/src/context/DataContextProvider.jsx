import React, { createContext, useState } from "react";
import { useEffect } from "react";

const DataContext = createContext();
function DataContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("home");
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

  const handleActive = () => {
    if (active === "home") {
      setActive("group");
    } else {
      setActive("home");
    }
  };
  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        handleActive,
        glbGroup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
