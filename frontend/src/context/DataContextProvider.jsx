import React, { createContext } from "react";

const DataContext = createContext();
function DataContextProvider({ children }) {
    const x = 10;
    const y = 110;
  return <DataContext.Provider value={{x,y}}>{children}</DataContext.Provider>;
}

export { DataContext, DataContextProvider };
