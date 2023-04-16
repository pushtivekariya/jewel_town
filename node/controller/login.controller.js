
const con = require("../database");
var bodyParser = require("body-parser");
var md5 = require("md5");
var nodemailer = require("nodemailer");





var login = (req, res) => {
  try {
const login_qry = `select * from user_registration where email='${req.body.email}' and password='${md5(req.body.password)}' and status = '0'`
con.query(login_qry,(error,result)=>{
  

  if (error) {
    console.log(error);
  } if (result.length > 0) {
   res.send({result:result,status:1,message:'login successfully'})
  
   console.log(result,'login successfull')
  } else {
    res.send({result:[],status:0,message:'username and password is not valid'})
  }
})
  }catch(error){
    console.log(error);
  }
}

// for get user Information 
const userInfo = (req,res) =>{
  try {
    const userInfoQry = `select * from user_registration`
    con.query(userInfoQry,(error,result)=>{
      if (error) {
        console.log(error);
      } else {
        res.send({result:result,status:1})
      }
    })
  } catch (error) {
    console.log(error);
  }
}


var NewPasswordApi = (req, res) => {
  try {
      const UpdatePasswordQry = `Update user_registration set password = '${md5(req.body.password)}',otp=${null} where email ='${req.body.email}' and otp='${req.body.otp}'`

      con.query(UpdatePasswordQry, (error, result) => {
          console.log(error, result);
          if (error) {
              console.log(error);
          } else {
              if(result.affectedRows > 0){
                  res.send({status:1,message:"Password Changed Successfully..."})
              }else{
                  res.send({status:0,message:"Password not Changed ..."})

              }
          }
      })

      console.log("Called");
  } catch (error) {
      console.log(error);
  }
}

var otpVerification = (req, res) => {
  try {
      const sql = `Select * from user_registration where email='${req.params.email}' and otp='${req.params.otp}'`

      con.query(sql, (error, result) => {
          console.log(error, result);
          if (error) {
              console.log(error);
          } else {
              if(result.length > 0){
                  res.send({status:1,message:"Otp verified Successfully..."})
              }else{
           res.send({status:0,message:"Otp is wrong..."})

              }
          }
      })
  } catch (error) {
      console.log(error);
  }
}

var RequestForOtp = (req, res) => {
  try {
      const otp = Math.floor(Math.random()* 1000000) + 1;
      const GetEmailQry = `Select * from user_registration where email = '${req.params.email}'`

      con.query(GetEmailQry, (error, result) => {
          console.log(error, result);
          if (error) {
              console.log(error);
          } else {
              if(result.length > 0){
                  const SetOtpQry = `Update user_registration set otp = '${otp}' where email = '${req.params.email}'`;
                  con.query(SetOtpQry, (error1, result1) => {
                      console.log(error1, result1);
                      if (error1) {
                          console.log(error1);
                      } else {
                          if(result1.affectedRows > 0){
                              let transport = nodemailer.createTransport({
                                  service: "gmail",
                                  auth: {
                                      user: "pushtivekariya76@gmail.com",
                                      pass: "slxveenczexilkoz"
                                  }
                              })

                              let mailOptions = {
                                  from: "pushtivekariya76@gmail.com",
                                  to: req.params.email,
                                  subject: " Jewel Town Login Password Reset OTP Request",
                                  text: `
                                  Dear Customer,

                                            We have received your request to reset your password on Jewel Town. To help you regain access to your account, we have generated a One-Time Password (OTP) for you.
                                            Please use this OTP to reset your password:

                                            Six Digit OTP :[${otp}]
                                              `
                              }
                              transport.sendMail(mailOptions, (err, info) => {
                                  if (err) {
                                      console.log(err);
                                  } else {
                                      console.log(info, "info");
                                  }
                              })
                              res.send({status:1,message:"OTP sent Successfully..."})
                          }
                      }
                  })

              }else{
                  res.send({status:0,message:"Email Does  Not Exist"})

              }
          }
      })

      console.log("Called");
  } catch (error) {
      console.log(error);
  }
}



module.exports = {
  login,
  userInfo,
  NewPasswordApi,
  otpVerification,
  RequestForOtp
};
