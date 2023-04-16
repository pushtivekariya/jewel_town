import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/common_api";
const Login = () => {
  const navigate = useNavigate();
  const [logindata, setLoginData] = useState([]);
console.log(logindata,"logindata");
  const changeLoginData = (e) => {
    setLoginData({ ...logindata, [e.target.name]: e.target.value });
  };

  const loginSubmit = async () => {

if (logindata.email == null) {
  toast.error("Please Enter Your Email")
} else if(logindata.password == null ){
  toast.error("Please Enter Your Password")
}else{

  const results = await login(logindata);
  if (results.status == 1) {
    loginStorage(logindata);
    localStorage.setItem("login_info", JSON.stringify(results.result));
  } else {
    toast.error("please enter valid email and password");
  }
}

  };

  const loginStorage = (logindataa) => {
    console.log(logindataa);
    var loginarr = [];
    loginarr = JSON.parse(localStorage.getItem("login_info")) || [];
    console.log(loginarr.length);
    if (loginarr.length > 0) {
      toast.error("You Are Already Login");
    } else {
      loginarr.push(logindataa);
      toast.success("login successfully.............");
      navigate("/");
      // document.location.reload();
    }
  };

  return (
    <>
      <div className="containers loginpage" >
        <div className="title2">login</div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="enter your email"
                  onChange={(e) => changeLoginData(e)}
                />
              </div>
            </div>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  onChange={(e) => changeLoginData(e)}
                />
              </div>
            </div>
            <div className="button">
              <input
                style={{ fontSize: "20px", height: "45px" }}
                type="button"
                name="sub"
                value="submit"
                onClick={() => {
                  loginSubmit();
                }}
              ></input>
              {/* <Link to='/login' >login here</Link> */}
            </div>
            <Link to="/registration" style={{color:'#c39584'}}>register here</Link>
            <Link style={{marginLeft:'57%',color:'#c39584'}}   to="/forgotpassword">forgot password</Link>
          </form>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </>
  );
};

export default Login;
