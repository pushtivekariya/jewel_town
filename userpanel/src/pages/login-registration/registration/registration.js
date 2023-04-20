import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registration } from "../../../api/common_api";

const Registration = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    user_name: "",
    email: "",
    contact_no: "",
    password: "",
    gender: "",
    date_of_birth: "",
  });
  // const [status ,setStatus] = useState(null)
  const changeData = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  };
  const formSubmit = async () => {
    // console.log(data.gender);
    const mailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const mobile = /^[0-9]{10}$/;
    const datevalidation = () => {
      if (data.date_of_birth === "") {
        return false;
      }
    };





    if (data.user_name === "") {
      toast.error("enter your name", { position: "top-right" });
    } else if (mailValidation.test(data.email) === false) {
      toast.error("please enter email in proper format", {
        position: "top-right",
      });
    } else if (mobile.test(data.contact_no) === false) {
      toast.error("enter only 10 digit mobile number");
    } else if (passValidation.test(data.password) === false) {
      toast.error("password must contain at least 8 char with uppercase, number and special char");
    } 
    else if (data.confirmPassword == "") {
      toast.error("please enter confirm password");
    }
    else if(data.confirmPassword == ""){
      toast.error("Please Enter Confirm Password")
    }
    else if ((data.password !== data.confirmPassword) == false) {
      toast.error("Password Does Not Match");
    } 
    else if (datevalidation() === false) {
      toast.error("please select date of birth");
    }
    else if (data.gender === "") {
      toast.error("please select gender");
    }  else {
      console.log(data);
      const result = await registration(data)
      // alert(result);
      console.log(result);
      if (result.status === 1) {
        // navigate("/login");
        toast.success("registeration successfull");
        window.location.replace("/login");
        // navigate("/login")
        // <Navigate to='login' replace/>
        // return redirect("/login");
      }
    }
  };

  return (
    <>
     
      <div className="reg">
      <div className="containers">
        <div className="title">Registration</div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">User Name</span>
                <input
                  type="text"
                  name="user_name"
                  placeholder="enter your name"
                  onChange={(e) => changeData(e)}
                />
              </div>

              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  name="email"
                  className="input-text"
                  placeholder="enter your email"
                  onChange={(e) => changeData(e)}
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  name="contact_no"
                  className="input-text"
                  placeholder="enter mobile number"
                  onChange={(e) => changeData(e)}
                  maxLength='10'
                  minLength='10'
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  className="input-text"
                  placeholder="create password"
                  onChange={(e) => changeData(e)}
                />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  className="input-text"
                  placeholder="confirm password"
                  onChange={(e) => changeData(e)}
                />
              </div>
              <div className="input-box">
                <span className="details">Date Of Birth</span>
                <input
                  type="date"
                  name="date_of_birth"
                  className="input-text"
                  placeholder="enter date"
                  onChange={(e) => changeData(e)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="gender-details">
              <input
                type="radio"
                name="gender"
                className="input-text"
                onChange={(e) => changeData(e)}
                id="dot-1"
                value='male'
              />
              <input
                type="radio"
                name="gender"
                className="input-text"
                onChange={(e) => changeData(e)}
                id="dot-2"
                value='female'
              />
              <input
                type="radio"
                name="gender"
                className="input-text"
                onChange={(e) => changeData(e)}
                id="dot-3"
                value='other'
              />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one" />
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two" />
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three" />
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
            <div className="input-box"></div>
            <div className="button">
              <input
                type="button"
                name="sub"
                value="submit"
                onClick={() => formSubmit()}
         
              ></input>
            </div>
              <Link style={{color:'#c39584'}} to="/login">login here</Link>
          </form>
        </div>
      </div>
      </div>
      <ToastContainer />
    
    </>
  );
};

export default Registration;
