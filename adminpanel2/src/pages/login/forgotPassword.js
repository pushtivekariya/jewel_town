import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UpdatePassword, sendOtpApi, verifyOtpApi } from "../../api/common_api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formStep, setformStep] = useState(0);
  const [passwordData, setpasswordData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const onPasswordChange = async (e) => {
    setpasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const SenOtpFunc = async () => {
    //  form Validation
    if (passwordData.email == "") {
      toast.error("Please Enter Email");
    } else {
      console.log(passwordData?.email, "email");

      const response = await sendOtpApi(passwordData?.email);
      console.log(response, "responseresponse");
      if (response.status == 1) {
        setformStep(formStep + 1);
        toast.success("OTP is Sent Successfully On Your Email");
      } else {
        toast.error("Please Enter Valid Email");
      }
    }
  };

  const OtpVerificationFunc = async () => {
    //  form Validation
    console.log(passwordData?.otp, "otp");

    const resp = await verifyOtpApi(passwordData?.otp, passwordData?.email);
    console.log(resp, "ertete");
    if (resp.status == 1) {
      setformStep(formStep + 1);
      toast.success("OTP Verified Successfully");
    } else if (resp.status == 0) {
      toast.error("Please Enter Valid OTP");
    }
  };
  const updatePasswordFunc = async () => {
    //  form Validation
    if (passwordData?.password == passwordData?.confirmPassword) {
      const resp = await UpdatePassword(passwordData);
      if (resp.status == 1) {
        setpasswordData({
          email: "",
          otp: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
        toast.success("Password Changed SuccessFully");
      }
      console.log(resp, "EEEEEEEEEEEe");
    } else {
      toast.error("Password Mismatched");
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* <div className="form-gap" /> */}
      <div
        className="container"
        style={{ height: "100vh", overflowY: "hidden" }}
      >
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div
              className="panel panel-default"
              style={{
                marginTop: "180px",
                marginBottom: "200px",
                border: "none",
                // border: "2px solid black",
              }}
            >
              <div className="panel-body">
                <div className="text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x" />
                  </h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <h5>You can reset your password here.</h5>
                  <div className="panel-body">
                    <form
                      id="register-form"
                      role="form"
                      autoComplete="off"
                      className="form"
                      method="post"
                    >
                      {formStep == 0 ? (
                        <>
                          <div className="form-group">
                            <div
                              className="input-group"
                              style={{
                                border: "2px solid black",
                                height: "40px",
                              }}
                            >
                              <span className="input-group-addon">
                                <i className="glyphicon glyphicon-envelope color-blue" />
                              </span>
                              <input
                                style={{ height: "40px" }}
                                id="email"
                                name="email"
                                placeholder="email address"
                                className="form-control"
                                type="email"
                                value={passwordData?.email}
                                onChange={(e) => {
                                  onPasswordChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="form-group"
                            style={{ alignItems: "center", width: "50%" }}
                          >
                            <button
                              style={{
                                backgroundColor: "#c39584",
                                border: "2px solid black",
                                fontSize: "20px",
                                textAlign: "center",
                              }}
                              name="button"
                              className="btn btn-md btn-primary btn-block"
                              defaultValue="Reset Password"
                              type="button"
                              onClick={() => {
                                SenOtpFunc();
                              }}
                            >
                              Reset Password
                            </button>
                          </div>
                          <span
                            style={{ marginTop: "20px", marginLeft: "-6px" }}
                          >
                            Don't have an account? <Link to="/">Sign in</Link>
                          </span>
                        </>
                      ) : formStep == 1 ? (
                        <>
                          <div className="form-group">
                            <div
                              className="input-group"
                              style={{
                                border: "2px solid black",
                                height: "40px",
                              }}
                            >
                              <span className="input-group-addon">OTP</span>
                              <input
                                style={{ height: "40px" }}
                                id="otp"
                                name="otp"
                                placeholder="Please Enter a Valid OTP"
                                className="form-control"
                                type="text"
                                value={passwordData?.otp}
                                onChange={(e) => {
                                  onPasswordChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="form-group"
                            style={{ alignItems: "center", width: "50%" }}
                          >
                            <button
                              style={{
                                backgroundColor: "#c39584",
                                border: "2px solid black",
                                fontSize: "20px",
                                textAlign: "center",
                              }}
                              name="button"
                              className="btn btn-md btn-primary btn-block"
                              defaultValue="Reset Password"
                              type="button"
                              onClick={() => {
                                OtpVerificationFunc();
                              }}
                            >
                              Verify OTP
                            </button>
                          </div>
                          <span
                            style={{ marginTop: "20px", marginLeft: "-6px" }}
                          >
                            Don't have an account? <Link to="/">Sign in</Link>
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="form-group">
                            <div
                              className="input-group"
                              style={{
                                border: "2px solid black",
                                height: "40px",
                              }}
                            >
                              <span className="input-group-addon">
                                Password
                              </span>
                              <input
                                style={{ height: "40px" }}
                                id="password"
                                name="password"
                                placeholder="Enter Your new Password "
                                className="form-control"
                                type="text"
                                value={passwordData?.password}
                                onChange={(e) => {
                                  onPasswordChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div
                              className="input-group"
                              style={{
                                border: "2px solid black",
                                height: "40px",
                              }}
                            >
                              <span className="input-group-addon">
                                Confirm Password
                              </span>
                              <input
                                style={{ height: "40px" }}
                                id="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="form-control"
                                type="text"
                                value={passwordData?.confirmPassword}
                                onChange={(e) => {
                                  onPasswordChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="form-group"
                            style={{ alignItems: "center", width: "50%" }}
                          >
                            <button
                              style={{
                                backgroundColor: "#c39584",
                                border: "2px solid black",
                                fontSize: "20px",
                                textAlign: "center",
                              }}
                              name="button"
                              className="btn btn-md btn-primary btn-block"
                              defaultValue="Reset Password"
                              type="button"
                              onClick={() => {
                                updatePasswordFunc();
                              }}
                            >
                              Change Password
                            </button>
                          </div>
                          <span
                            style={{ marginTop: "20px", marginLeft: "-6px" }}
                          >
                            Don't have an account? <Link to="/">Sign in</Link>
                          </span>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
