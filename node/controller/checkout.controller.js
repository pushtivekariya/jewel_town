const con = require("../database");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var moment = require("moment");


const checkOut = (req, res) => {
  console.log(req.body, "data");
  try {
    const addressQry = `insert into address ( user_id, house_no, street_name, area, city, state, pincode) values ('${req.body.user_id}','${req.body.Address.house_no}',"${req.body.Address.street_name}","${req.body.Address.area}","${req.body.Address.city}","${req.body.Address.state}","${req.body.Address.pincode}") `;
    con.query(addressQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.affectedRows > 0) {
          const orderDate = moment().format("YYYY-MM-DD");
          // console.log(orderDate, "order_dateeee");
          const order_infoQry = `insert into order_information (user_id, total_amount,discount_amount,final_amount,promocode, order_date, transaction_id, user_name, email, contact_no, gender, address_id) values(${req.body.user_id},${req.body.orderInfo.total_amount},${req.body.discount_amount},${req.body.final_amount},'${req.body.promocode}','${orderDate}','${req.body.orderInfo.transaction_id}','${req.body.userInfo.user_name}','${req.body.userInfo.email}','${req.body.userInfo.contact_no}','${req.body.userInfo.gender}',${result.insertId})`;
          con.query(order_infoQry, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              if (result1.affectedRows > 0) {
                // console.log(result1.affectedRows, "affected rows......");

                for (let i = 0; i < req.body.orderDetail.length; i++) {
                  // console.log(req.body.orderDetail, "length");
                  const orderDetailQry = `insert into order_details  ( order_id, product_id, price, weight,jewellary_purity,user_qty, total_amt, product_names, jwellary_type, jwellary_size) values (${result1.insertId},${req.body.orderDetail[i].product_id},${req.body.orderDetail[i].price},'${req.body.orderDetail[i].weight}','${req.body.orderDetail[i].jewellary_purity}',${req.body.orderDetail[i].user_qty},${req.body.orderDetail[i].total_amt},'${req.body.orderDetail[i].product_names}','${req.body.orderDetail[i].jwellary_type}','${req.body.orderDetail[i].size}')`;
                  con.query(orderDetailQry, (error2, result2) => {
                    if (error2) {
                      console.log(error2);
                    } else {
                      if (result2.affectedRows > 0) {
                        const updateLessQtyQry = `update product set quantity = quantity - ${req.body.orderDetail[i].user_qty} where product_id = ${req.body.orderDetail[i].product_id}`;

                        con.query(updateLessQtyQry, (error3, result3) => {
                          if (error3) {
                            console.log(error3);
                          } else {
                            console.log("order details are stored....");
                          }
                        });
                      }
                    }
                  });
                }
                var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "pushtivekariya76@gmail.com",
                    pass: "slxveenczexilkoz",
                  },
                });

                var mailOptions = {
                  from: "pushtivekariya76@gmail.com",
                  to: req.body.userInfo.email,
                  subject: "Purchase Confirmation for Your Order",
                  text: `Dear  ${req.body.userInfo.user_name},
                  
                                  We are pleased to confirm that your recent purchase has been processed and completed successfully. 
                                  Thank you for choosing our online store for your shopping needs.
                                
                                  Your payment has been successfully processed and your order will be shipped within the next days.
                                  You will receive a separate email with the shipment tracking details once your order is dispatched.
                                 
                                  Please keep this email for your records. 
                                  If you have any questions or concerns regarding your purchase, please don't hesitate to contact us at 8866445763.
                                  We are always here to assist you.
                                 
                                  Thank you for shopping with us. We look forward to serving you again soon.

                       
                        Best Regards,
                        Jewel Town `,
                };

                transporter.sendMail(mailOptions, function (error4, info4) {
                  if (error4) {
                    console.log(error4);
                  } else {
                    console.log("Email sent: " + info4.response);
                    res.send({
                      result: info4,
                      status: 1,
                      message: "sent",
                    });
                  }
                });
                // console.log("for loop endpart called");
              } else {
                // console.log("else part");
              }
            }
          });
        }
      }

      res.send({
        result3: result,
        status: 1,
        message: "checkout successfully...........",
      });
    });
  } catch (error) {
    console.log(error);
    
  }
};

module.exports = {
  checkOut,
};
