import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/SignUp/SignUp";
import { DataContextProvider } from "./context/DataContextProvider";
import PrivateRoute from "./private/PrivateRoute";
import Main from "./components/Main/Main";
import Dashboard from "./components/Dashboard/Dashboard";
import Groups from "./components/Groups/Groups";
import GroupDetails from "./components/GroupDetails/GroupDetails";
import AddGroup from "./components/AddGroup/AddGroup";
import AddExpense from "./components/AddExpense/AddExpense";
function App() {
  return (
    <>
      <BrowserRouter>
        <DataContextProvider>
          <Routes>
            <Route path="/auth" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/app/"
              element={
                <PrivateRoute>
                  <Main></Main>
                </PrivateRoute>
              }
            >
              <Route path="" element={<Dashboard />} />
              <Route path="addgroup" element={<AddGroup />} />
              <Route path="groups" element={<Groups />} />
              <Route
                path="groups/details/:groupID"
                element={<GroupDetails />}
              />
              <Route
                path="groups/details/:groupID/addexpense"
                element={<AddExpense />}
              />
            </Route>
          </Routes>
        </DataContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
