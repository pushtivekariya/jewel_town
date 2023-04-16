import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getotprequest, setnewpassword, verificationOTP } from '../../../api/common_api';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setstep] = useState(0);
    const [data,setData] = useState({email:'',otp:'',password:'',cpassword:''})
    const handleChange = async (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }


    const otpRequestFunction = async () => {
        if(data.email == "")
        {
            toast.error("Please enter email")
        }
        else{
            console.log(data?.email,'email');
            const resp = await getotprequest(data?.email);
            console.log(resp,'response');
            if(resp.status == 1) {
                setstep(step + 1);
                toast.success("OTP sent Successfully On Your Email...")
            }
            else{
                toast.error("Please Enter Valid Email")
            }
        }
      

    }


    const verifyOTPfunction = async () => {
        if(data.otp == "")
        {
            toast.error("Please enter OTP")
        }
        else{
        console.log(data?.otp,'otpp');
        const resp = await verificationOTP(data?.otp,data?.email)
        console.log(resp,'respresp');
        if(resp.status == 1){
            setstep(step + 1);
            toast.success("OTP Verified Successfully")
        }
        else{
            toast.error("Please Enter valid OTP")
        }
    }
    }

    const setpasswordfunction = async () => {
        if(data.password == "")
        {
            toast.error("Please enter password")
        }
        else if(data.cpassword == "")
        {
            toast.error("Please enter confirm password")

        }
       else if(data?.password == data?.cpassword)
        {
            const resp = await setnewpassword(data);
            if(resp.status == 1)
            {
              setData({email:'',otp:'',password:'',cpassword:''})
              navigate("/login");
              toast.success("password change successfully...")
            }
             console.log(resp,'eeeee');
        }
        else {
            toast.error("password mismatched...")

        }
    }
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
            <div className="form-gap" />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default" style={{ marginTop: '180px', marginBottom: '200px', border: '2px solid black' }}>
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3>
                                        <i className="fa fa-lock fa-4x" />
                                    </h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <form
                                            // id="register-form"
                                            // role="form"
                                            // autoComplete="off"
                                            // className="form"
                                            // method="post"
                                        >
                                            {
                                                step == 0 ? (
                                                    <>
                                                        <div className="form-group">
                                                            <div className="input-group" style={{ border: '2px solid black', height: '40px' }}>
                                                                <span className="input-group-addon">
                                                                    <i className="glyphicon glyphicon-envelope color-blue" />
                                                                </span>
                                                                <input
                                                                    style={{ height: '40px' }}
                                                                    id="email"
                                                                    name="email"
                                                                    placeholder="email address"
                                                                    className="form-control"
                                                                    type="email"
                                                                    value={data?.email}
                                                                    onChange={(e)=> {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group" style={{ width: '75%' }}>
                                                            <button
                                                                style={{ backgroundColor: '#c39584', border: '2px solid black',height:'40px' }}
                                                                name="button"
                                                                className="btn btn-lg btn-primary btn-block"
                                                                type="button"
                                                                onClick={()=> {
                                                                    otpRequestFunction()
                                                                }}  
                                                            >Reset Password
                                                                </button>
                                                        </div>
                                                        <span style={{ marginTop: '20px', marginLeft: '-6px' }}>Don't have an account? <Link to='/login'>Sign in</Link></span>
                                                    </>
                                                ) : step == 1  ? (
                                                    <>
                                                     <div className="form-group">
                                                            <div className="input-group" style={{ border: '2px solid black', height: '40px' }}>
                                                                <span className="input-group-addon">
                                                                OTP
                                                                </span>
                                                                <input
                                                                    style={{ height: '40px' }}
                                                                    id="otp"
                                                                    name="otp"
                                                                    placeholder="Please Enter a Valid OTP"
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={data?.otp}
                                                                    onChange={(e)=> {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group" style={{ width: '75%' }}>
                                                            <button
                                                                style={{ backgroundColor: '#c39584', border: '2px solid black',height:'40px' }}
                                                                name="button"
                                                                className="btn btn-lg btn-primary btn-block"
                                                                defaultValue="Reset Password"
                                                                type="button"
                                                                 onClick={()=> {
                                                                    verifyOTPfunction()
                                                                 }}
                                                            >Confirm
                                                                </button>
                                                        </div>
                                                        <span style={{ marginTop: '20px', marginLeft: '-6px' }}>Don't have an account? <Link to='/login'>Sign in</Link></span>
                                                    </>
                                                ): (
                                                    <>
                                                       <div className="form-group">
                                                            <div className="input-group" style={{ border: '2px solid black', height: '40px' }}>
                                                                <span className="input-group-addon">
                                                                Password
                                                                </span>
                                                                <input
                                                                    style={{ height: '40px' }}
                                                                    id="password"
                                                                    name="password"
                                                                    placeholder="Enter Your new Password "
                                                                    className="form-control"
                                                                    type="password"
                                                                    value={data?.password}
                                                                    onChange={(e)=> {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group" style={{ border: '2px solid black', height: '40px' }}>
                                                                <span className="input-group-addon">
                                                                Confirm Password
                                                                </span>
                                                                <input
                                                                    style={{ height: '40px' }}
                                                                    id="cpassword"
                                                                    name="cpassword"
                                                                    placeholder="Confirm Password"
                                                                    className="form-control"
                                                                    type="password"
                                                                    value={data?.cpassword}
                                                                    onChange={(e)=> {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group" style={{ width: '75%' }}>
                                                            <button
                                                                style={{ backgroundColor: '#c39584', border: '2px solid black',height:'40px' }}
                                                                name="button"
                                                                className="btn btn-lg btn-primary btn-block"
                                                               
                                                                type="button"
                                                               onClick={setpasswordfunction}
                                                            >Change Password
                                                                </button>
                                                        </div>
                                                        <span style={{ marginTop: '20px', marginLeft: '-6px' }}>Don't have an account? <Link to='/login'>Sign in</Link></span>
                                                    </>
                                                )
                                                } 
                                            

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ForgotPassword