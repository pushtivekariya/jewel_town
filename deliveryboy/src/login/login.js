import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { deliveryLoginApi } from "../api/common_api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigates = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const onLoginChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  console.log(login, "llll");
  const loginSubmit = async () => {
    if (login.email == "") {
      toast.error("Please Enter Your Email");
    } else if (login.password == "") {
      toast.error("Please Enter Your Password");
    } else {
      const response = await deliveryLoginApi(login);
      //   console.log(response.result, "delivery ");
      if (response.status == 1) {
        toast.success("Login Successfullly");
        setLogin(login);
        localStorage.setItem(
          "DeliveryBoyLogin_Info",
          JSON.stringify(response.result)
        );
      } else {
        toast.error("Please Enter Valid Username And Password");
      }
    }
  };
  const setLogin = (logindata) => {
    console.log(logindata, "login data");
    var loginArray = [];
    loginArray =
      JSON.parse(localStorage.getItem("DeliveryBoyLogin_Info")) || [];
    loginArray.push(logindata);
    localStorage.setItem("DeliveryBoyLogin_Info", JSON.stringify(loginArray));
    navigates("/");
    window.location.reload();
  };
  return (
    <>
      <div className="background">
        {/* <div className="shape" />
        <div className="shape" /> */}
      </div>
      <form>
        <h3>Login Here</h3>
        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          id="username"
          name="email"
          onChange={(e) => onLoginChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          name="password"
          onChange={(e) => onLoginChange(e)}
        />
        <button className="buttons" type="button" onClick={() => loginSubmit()}>
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
