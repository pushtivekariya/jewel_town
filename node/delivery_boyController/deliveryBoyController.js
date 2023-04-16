const con = require("../database");
var bodyParser = require("body-parser");
var md5 = require("md5");
var nodemailer = require("nodemailer");
const deliveryLogin = (req, res) => {
  try {
    console.log(req.body, "bodyyy");
    const login_qry = `select * from delivery_boy_information where email='${
      req.body.email
    }' and password='${md5(req.body.password)}'`;
    con.query(login_qry, (error, result) => {
      console.log(result, "qqqqqqqqqqqqqqq");
      if (error) {
        console.log(error);
      } else if (result.length > 0) {
        res.send({ result: result, status: 1, message: "login successfully" });
        console.log("login successfully");
      } else {
        res.send({
          result: [],
          status: 0,
          message: "please enter valid username and password",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendDeliverdOTP = (req, res) => {
  try {
    console.log(req.body, "body");
    const otp = Math.floor(Math.random() * 1000000) + 1;
    const getemailQry = `select * from order_information where email = '${req.body.email}'`;
    con.query(getemailQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const setOTPQry = `update order_information set otp = ${otp} where email = '${req.body.email}'`;
          con.query(setOTPQry, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              if (result1.affectedRows > 0) {
                var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "pushtivekariya76@gmail.com",
                    pass: "slxveenczexilkoz",
                  },
                });
                let mailOptions = {
                  from: "pushtivekariya76@gmail.com",
                  to: req.body.email,
                  subject:
                    "One Time Password For Confirming Your Order Is Deliverd To You Successfully",
                  text: `Your Six Digit Otp Is :${otp}`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(info);
                  }
                });
                res.send({
                  status: 1,
                  message: "OTP are sent",
                  result: result1,
                });
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const otpVerification = (req, res) => {
  try {
    const otpverifyQry = `select * from order_information where email = '${req.params.email}' and otp = ${req.params.otp}`;
    con.query(otpverifyQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const orderstatusUpdateQry = `update order_information set order_status=4 , otp = ${null} where email = '${
            req.params.email
          }' and otp = ${req.params.otp}`;
          con.query(orderstatusUpdateQry, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              if (result.affectedRows > 0) {
                res.send({
                  result: result,
                  status: 1,
                  message: "order delivered successfully...",
                });
              } else {
                res.send({
                  result: [],
                  status: 0,
                  message: "Order not delivered",
                });
              }
            }
          });
        } else {
          res.send({ result: [], status: 0, message: "otp does not match" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deliveryLogin,
  sendDeliverdOTP,
  otpVerification,
  // updatestatus,
};
