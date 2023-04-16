const con = require("../database");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var md5 = require("md5");
// check email and send otp in mail
const sendOtp = (req, res) => {
  try {
    const otp = Math.floor(Math.random() * 1000000) + 1;
    const getEmailQry = `select * from admin_information where email = '${req.params.email}'`;
    con.query(getEmailQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          setOtpQry = `update admin_information set otp= '${otp}' where email = '${req.params.email}'`;
          con.query(setOtpQry, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              if (result1.affectedRows > 0) {
                let transport = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "pushtivekariya76@gmail.com",
                    pass: "slxveenczexilkoz",
                  },
                });
                let mailOptions = {
                  from: "pushtivekariya76@gmail.com",
                  to: req.params.email,
                  subject:
                    "One Time Password For Changing Your Admin Login Password",
                  text: `Your Six Digit Otp Is :${otp}`,
                };
                transport.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(info);
                  }
                });
                res.send({ status: 1, message: "OTP are sent" });
              }
            }
          });
        } else {
          res.send({ status: 0, message: "email does not exists" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// verify entered OTP
const otpVerification = (req, res) => {
  try {
    const otpVerifyQry = `select * from admin_information where email = '${req.params.email}' and otp = '${req.params.otp}'`;
    con.query(otpVerifyQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          res.send({ status: 1, message: "OTP Verified..." });
        } else {
          res.send({ status: 0, message: "OTP is wrong..." });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// update new password
const UpdatePassword = (req, res) => {
  try {
    var UpdatePasswordQry = `update admin_information set password = '${md5(req.body.password)}',otp = ${null} where email ='${req.body.email}' and otp = '${req.body.otp}'`;
    con.query(UpdatePasswordQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.affectedRows > 0) {
          res.send({ status: 1, message: "Password Changed" });
        } else {
          res.send({ status: 0, message: "Password Not Reset" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendOtp,
  otpVerification,
  UpdatePassword,
};
