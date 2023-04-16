const con = require("../database");
var bodyParser = require("body-parser");

var checkPromoCode = async (req, res) => {
  try {
    let reqData = req.body;
    console.log(reqData, "reqData");
    let orderdataresult = await orderdataresultFunction(reqData);

    let carttotalAmt = reqData.cartData?.reduce(
      (total1, obj) => parseInt(total1) + parseInt(obj.total_amt),
      0
    );
    console.log(carttotalAmt, "total amount");
    let promocodeData = await getPromocodeDataFunction(reqData); // check Promocode

    if (promocodeData.status == 1) {
      let Discount;
      console.log(reqData.cartData, "promocodeData.data");
      if (
        promocodeData.data.user_id == 0 ||
        promocodeData.data.user_id == reqData.user_id
      ) {
        if (carttotalAmt >= promocodeData.data.minimum_order_amount) {
          if (promocodeData.data.promocode_type == 2) {
            Discount = promocodeData.data.promocode_discount_amount;
          } else {
            Discount =
              (carttotalAmt * promocodeData.data.promocode_discount_amount) /
              100;
          }

          if (orderdataresult.data.length < promocodeData.data.no_of_use) {
            let obj = {
              Disamt: Discount,
              finalamt: carttotalAmt - Discount,
            };
            res.send({
              status: 1,
              data: obj,
              msg: "Promocode Applied Successfully",
            });
          } else {
            res.send({
              status: 2,
              data: [],
              msg: "This Coupon All Ready Used",
            });
          }
        } else {
          res.send({
            status: 0,
            data: [],
            msg: `Your Order Lessthen ${promocodeData.data.minimum_order_amount}`,
          });
        }
      } else {
        res.send({ status: 0, data: [], msg: "Invalid Promo Code" });
      }
    } else {
      res.send({
        status: 0,
        data: [],
        msg: "Invalid Promo Code OR Promocode Not Exist",
      });

      //
    }
  } catch (error) {
    console.log(error);
  }
};

var orderdataresultFunction = async (data) => {
  try {
    let ordersql = `SELECT * FROM order_information WHERE promocode = "${data.promocode}" AND user_id = ${data.user_id}`;
    let response = await new Promise((resolve, reject) => {
      con.query(ordersql, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result, "0000000000000");
          if (result.length > 0) {
            resolve({ status: 1, data: result, msg: "Order Found" });
          } else {
            console.log("not found");
            resolve({ status: 0, data: [], msg: "Order not Found" });
          }
        }
      });
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

var getPromocodeDataFunction = async (data) => {
  try {
    let promodata = `SELECT * FROM promo_code WHERE promo_code.promocode = "${data.promocode}" AND status = 0 `;
    let response = await new Promise((resolve, reject) => {
      con.query(promodata, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result.length > 0) {
            resolve({ status: 1, data: result[0], msg: "Promocode Found" });
          } else {
            resolve({ status: 0, data: [], msg: "Promocode not Found" });
          }
        }
      });
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkPromoCode,
};
