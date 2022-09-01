import React from "react";
import { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContextProvider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const loginRef = useRef();
  const navigate = useNavigate();
  const [signUser, setSignUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(DataContext);
  const handleSignUser = (e) => {
    setSignUser({ ...signUser, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(signUser);

    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/signup",
      data: signUser,
    });
    const res = response.data;
    console.log(res);
    if (res.status == false) {
      toast(res.msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    } else {
      toast(res.msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "success",
        theme: "dark",
      });
      setSignUser({
        name: "",
        email: "",
        password: "",
      });

      loginRef.current.click();
    }
  };

  const handleLoginUser = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginUser);

    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/login",
      data: loginUser,
    });
    const res = response.data;
    console.log(res);
    if (res.status == false) {
      toast(res.msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    } else {
      toast(res.msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "success",
        theme: "dark",
      });
      setUser({ ...res.user });
      window.localStorage.setItem("isLogin", true);
      navigate("/app");
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <div>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                onChange={(e) => handleSignUser(e)}
                type="text"
                name="name"
                placeholder="User name"
                value={signUser.name}
                required
              />
              <input
                onChange={(e) => handleSignUser(e)}
                type="email"
                name="email"
                placeholder="Email"
                value={signUser.email}
                required
              />
              <input
                onChange={(e) => handleSignUser(e)}
                type="password"
                name="password"
                placeholder="Password"
                value={signUser.password}
                required
              />
              <button onClick={(e) => handleSignUp(e)}>Sign up</button>
            </div>
          </div>

          <div className="login">
            <div>
              <label ref={loginRef} htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => handleLoginUser(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => handleLoginUser(e)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default SignUp;
