const con = require("../database");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const orderInformation = (req, res) => {
  try {
    const orderInfoQry = `select * , (select user_name from user_registration where user_registration.user_id = order_information.user_id) as user_name,  (select house_no from address where address.address_id = order_information.address_id) as house_no, (select street_name from address where address.address_id = order_information.address_id) as street_name, (select area from address where address.address_id = order_information.address_id) as area, (select city from address where address.address_id = order_information.address_id) as city,(select state from address where address.address_id = order_information.address_id) as state,(select pincode from address where address.address_id = order_information.address_id) as pincode from order_information where order_status=0 `;
    con.query(orderInfoQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "order data fetched" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelledOrderData = (req, res) => {
  try {
    const orderInfoQry = `select * , (select user_name from user_registration where user_registration.user_id = order_information.user_id) as user_name,  (select house_no from address where address.address_id = order_information.address_id) as house_no, (select street_name from address where address.address_id = order_information.address_id) as street_name, (select area from address where address.address_id = order_information.address_id) as area, (select city from address where address.address_id = order_information.address_id) as city,(select state from address where address.address_id = order_information.address_id) as state,(select pincode from address where address.address_id = order_information.address_id) as pincode from order_information where order_status=1 `;
    con.query(orderInfoQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "order data fetched" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const DispatchedOrderData = (req, res) => {
  try {
    const orderInfoQry = `select * , (select user_name from user_registration where user_registration.user_id = order_information.user_id) as user_name,  (select house_no from address where address.address_id = order_information.address_id) as house_no, (select street_name from address where address.address_id = order_information.address_id) as street_name, (select area from address where address.address_id = order_information.address_id) as area, (select city from address where address.address_id = order_information.address_id) as city,(select state from address where address.address_id = order_information.address_id) as state,(select pincode from address where address.address_id = order_information.address_id) as pincode from order_information where order_status=3 `;
    con.query(orderInfoQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "order data fetched" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// update status confirm to out of delivery admin side
const outOfDeliveryStatus = (req, res) => {
  console.log(req.params,"paramsss");
  try {
    const SetoutofdeliveryQry = `update order_information set order_status = 3 where order_id = ${req.params.order_id}`;
    con.query(SetoutofdeliveryQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({
          result: result,
          status: 1,
          message: "order out of delivery",
        });
        if (result.affectedRows > 0) {
            
          }
        console.log(result,"result");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "pushtivekariya76@gmail.com",
            pass: "slxveenczexilkoz",
          },
        });

        var mailOptions = {
          from: "pushtivekariya76@gmail.com",
          to: req.params.email,
          subject: "Order Dispatch Notification",
          text: `Dear ${req.params.user_name},

                                I am writing to inform you that the order has been dispatched and is on its way to the customer.
                                Please let us know if there are any issues with the shipment or if you require any further information.
                                We appreciate your prompt attention to this matter. 
                               
                                Thank you for your support and cooperation.
                                
                                
                  Best regards,
                  Jewel Town`,
                             
       
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
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// order details
const orderDetails = (req, res) => {
  try {
    const orderDetailsQry = `select * from order_details`;
    con.query(orderDetailsQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({
          result: result,
          status: 1,
          message: "order details are show",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// refund payment api
const refundEmail = (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pushtivekariya76@gmail.com",
        pass: "slxveenczexilkoz",
      },
    });

    var mailOptions = {
      from: "pushtivekariya76@gmail.com",
      to: req.body.email,
      subject: "Refund Payment From Jewel Town",
      text: `Dear ${req.body.user_name},

                 We hope this email finds you well. We wanted to reach out to you regarding your recent purchase with our company.
                 If you have any further questions or concerns, please do not hesitate to reach out to us. We value your business and will do our best to resolve any issues in a timely and efficient manner.
                 we have approved your request for a refund in the amount of ${req.body.total_amount}.
       
       
      Best regards,
      Jewel Town 
        `,
    };

    transporter.sendMail(mailOptions, function (error4, result) {
      if (error4) {
        console.log(error4);
      } else {
        console.log("Email sent: " + result.response);
        console.log(result, "rrr");
        // res.send({
        //   result: result,
        //   status: 1,
        //   message: "sent",
        // });
        if (result !== {}) {
          const updateStatusQry = `update order_information set order_status = 2 where order_id = ${req.body.order_id} `;
          con.query(updateStatusQry, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              res.send({
                result: result1,
                status: 1,
                message: "payment refunded",
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// successfully delivered order
const deliveredOrders = (req, res) => {
  try {
    const orderInfoQry = `select * , (select user_name from user_registration where user_registration.user_id = order_information.user_id) as user_name,  (select house_no from address where address.address_id = order_information.address_id) as house_no, (select street_name from address where address.address_id = order_information.address_id) as street_name, (select area from address where address.address_id = order_information.address_id) as area, (select city from address where address.address_id = order_information.address_id) as city,(select state from address where address.address_id = order_information.address_id) as state,(select pincode from address where address.address_id = order_information.address_id) as pincode from order_information where order_status= 4 `;
    con.query(orderInfoQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "order data fetched" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  orderInformation,
  orderDetails,
  cancelledOrderData,
  outOfDeliveryStatus,
  DispatchedOrderData,
  refundEmail,
  deliveredOrders
};
