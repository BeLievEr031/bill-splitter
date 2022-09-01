import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/SignUp/SignUp";
import { DataContextProvider } from "./context/DataContextProvider";
import PrivateRoute from "./private/PrivateRoute";
import Main from "./components/Main/Main";
import Dashboard from "./components/Dashboard/Dashboard";
import Groups from "./components/Groups/Groups";
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="groups" element={<Groups />} />
            </Route>
          </Routes>
        </DataContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
