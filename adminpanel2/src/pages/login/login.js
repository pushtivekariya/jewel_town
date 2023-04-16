import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { adminLogin } from "../../api/common_api";

const Login = () => {
    const navigates = useNavigate()
  const [loginData, setloginData] = useState({
    admin_name: "",
    password: "",
  });

  const LoginChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const LoginSubmit = async () => {
    if (loginData.admin_name == "") {
      toast.error("Please Enter Admin Name");
    } else if (loginData.password == "") {
      toast.error("Please Enter Admin Password");
    } else {
      console.log("login");
      let results = await adminLogin(loginData);
      console.log(results, "result");
      if (results.status == 1) {
        setLogin(loginData);
        localStorage.setItem("Login_info", JSON.stringify(results.result));
      } else {
        toast.error("please enter valid username and password");
      }
    }
  };

  const setLogin = (login) => {
    console.log(login, "login data");
    var loginArray = [];
    loginArray = JSON.parse(localStorage.getItem("Login_info")) || [];
    // if (loginArray.length > 0) {
    //   toast.error("already login......");
    // } else {
    loginArray.push(login);
    // localStorage.setItem("Login_info", JSON.stringify(loginArray));
    navigates("/home");
    toast.success("login successfully");
    // }
    window.location.reload();
  };

  return (
    <>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo" style={ {marginLeft:"100px"}}>
                  <img src="images/logo.png" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      name="admin_name"
                      onChange={(e) => LoginChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => LoginChange(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      name="sub"
                      className="btn btn-primary mr-2"
                      onClick={() => LoginSubmit()}
                    >
                      SignIn
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    {/* <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div> */}
                    <Link to="/forgotPassword" className="auth-link text-black">
                      Forgot password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        {/* content-wrapper ends */}
      </div>
    </>
  );
};

export default Login;
