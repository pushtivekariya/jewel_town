const con = require("../database");
const bodyParser = require("body-parser");


//   try {
//     let orderLists = [];
//     const userOrderDetailQry = `select * from order_information where user_id = ${req.params.user_id}`;
//     con.query(userOrderDetailQry, (error, result) => {
//       if (error) {
//         console.log(error);
//       }
//       // res.send({result:result,status:3,message:"order data"})
//       if (result.length > 0) {
//         for (let index = 0; index < result.length; index++) {
//           const singleOrder = result[index];
//           let orderDetails = `select * ,(select image_url from product_media where product_media.product_id = product.product_id limit 1) as  image_url from order_details ,product  where product.product_id = order_details.product_id  and order_id = ${singleOrder.order_id}`;
//           console.log(singleOrder, "single...");
//           con.query(orderDetails, (error1, result1) => {
//             if (error1) {
//               console.log(error1);
//             }
//             console.log(result1, "rrr");
//             if (result1.length > 0) {
//               singleOrder["details"] = result1;
//               orderLists.push(singleOrder);
//               if (result1.length - 1 === index) {
//                 res.send({
//                   status: 1,
//                   result: orderLists,
//                   message: "order data arrived",
//                 });
//               }
//             }
//             else {
//                 console.log("order data not get");
//             }
//           });
//         }
//       } else {
//         res.send({ status: 0, result: [], message: "data not" });
//         console.log(orderLists, "lists");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const userOrderDetails = (req, res) => {
//   try {
//     let orderLists = [];
//     const userOrderDetailQry = `select *,(select house_no from address where address.address_id = order_information.address_id limit 1) as house_no ,(select street_name from address where address.address_id = order_information.address_id limit 1) as street_name   ,(select area from address where address.address_id = order_information.address_id limit 1) as area  ,(select city from address where address.address_id = order_information.address_id limit 1) as city  ,(select state from address where address.address_id = order_information.address_id limit 1) as state ,(select country from address where address.address_id = order_information.address_id limit 1) as country ,(select pincode from address where address.address_id = order_information.address_id limit 1) as pincode   from order_information where user_id = ${req.params.user_id}`;
//     con.query(userOrderDetailQry, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.send({ status: 0, result: [], message: "data not" });
//         return;
//       }
//       if (result.length > 0) {
//         let processedOrders = 0;
//         for (let i = 0; i < result.length; i++) {
//           const singleOrder = result[i];
//           let orderDetails = `select *, (select image_url from product_media where product_media.product_id = product.product_id limit 1) as image_url from order_details, product where product.product_id = order_details.product_id and order_id = ${singleOrder.order_id}`;
//           // console.log(singleOrder, "single...");
//           con.query(orderDetails, (error1, result1) => {
//             if (error1) {
//               console.log(error1);
//               res.send({ status: 0, result: [], message: "data not" });
//               return;
//             }
//             console.log(result1, "rrr");
//             if (result1.length > 0) {
//               singleOrder["details"] = result1;
//             } else {
//               singleOrder["details"] = [];
//             }
//             orderLists.push(singleOrder);
//             processedOrders++;
//             if (processedOrders === result.length) {
//               res.send({
//                 status: 1,
//                 result: orderLists,
//                 message: "order data arrived",
//               });
//             }
//           });
//         }
//       } else {
//         res.send({ status: 0, result: [], message: "data not" });
//         // console.log(orderLists, "lists");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({ status: 0, result: [], message: "data not" });
//   }
// };

const userOrderDetails = (req, res) => {
  try {
    let orderLists = [];

    const userOrderDetailQry = `SELECT *, (SELECT house_no FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS house_no, (SELECT street_name FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS street_name, (SELECT area FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS area, (SELECT city FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS city, (SELECT state FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS state, (SELECT pincode FROM address WHERE address.address_id = order_information.address_id LIMIT 1) AS pincode FROM order_information WHERE user_id = ${req.params.user_id}`;


    con.query(userOrderDetailQry, (error, result) => {
      if (error) {
        console.log(error);
        res.send({ status: 0, result: [], message: "data not" });
        return;
      }
      if (result.length > 0) {
        let processedOrders = 0;
        for (let i = 0; i < result.length; i++) {
          const singleOrder = result[i];
          let orderDetails = `SELECT *, (SELECT image_url FROM product_media WHERE product_media.product_id = product.product_id LIMIT 1) AS image_url FROM order_details, product WHERE product.product_id = order_details.product_id AND order_id = ${singleOrder.order_id}`;
          con.query(orderDetails, (error1, result1) => {
            if (error1) {
              console.log(error1);
              res.send({ status: 0, result: [], message: "data not" });
              return;
            }
            // console.log(result1, "rrr");
            if (result1.length > 0) {
              const addressQry = `select * from address where address_id = ${singleOrder.address_id}`
              con.query(addressQry, (error2, result2) => {
                if (error) {
                  console.log(error2);
                } else {
                  console.log(result2);
                }
              })

              singleOrder["details"] = result1;
            } else {
              singleOrder["details"] = [];
            }
            // singleOrder["address"] = {
            //   house_no: singleOrder["house_no"],
            //   street_name: singleOrder["street_name"],
            //   area: singleOrder["area"],
            //   city: singleOrder["city"],
            //   state: singleOrder["state"],
            //   country: singleOrder["country"],
            //   pincode: singleOrder["pincode"],
            // };

            orderLists.push(singleOrder);
            processedOrders++;
            if (processedOrders === result.length) {
              res.send({
                status: 1,
                result: orderLists,
                message: "order data arrived",
              });
            }
          });
        }
      } else {
        res.send({ status: 0, result: [], message: "data not" });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, result: [], message: "data not" });
  }
};

// cancel order controller
var OrderCancel = (req, res) => {
  try {

    const ordercencelQry = `Update order_information set order_status = 1 where order_id  = ${req.body.order_id} and order_status = 0`;
    con.query(ordercencelQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.affectedRows > 0) {
          for (let i = 0; i < req.body.details.length; i++) {
            updateQtyQry = `Update product set quantity = quantity + ${req.body.details[i].user_qty} where product_id = ${req.body.details[i].product_id}`;

            con.query(updateQtyQry, (error1, result1) => {
              console.log(error1, result1, 'error1, result1');
              if (error1) {
                console.log(error1);
              } else {
                if (result.affectedRows > 0) {
                  if (req.body.details.length - 1 == i) { res.send({ status: 1, msg: "Order cancelled Successfully... " }) }
                } else {
                  if (req.body.details.length - 1 == i) { res.send({ status: 0, msg: "Order not cancelled" }) }

                }
              }
            })
          }

        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  userOrderDetails,
  OrderCancel,
  
};
