const con = require("../database");
var bodyParser = require("body-parser");
var moment = require("moment");
// get total registered user

const totalUser = (req, res) => {
  try {
    const totaluserQry = `SELECT COUNT(*) AS total_customers FROM user_registration`;
    con.query(totaluserQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const totalProduct = (req, res) => {
  try {
    const totalProdQry = `SELECT COUNT(*) AS total_Product FROM product`;
    con.query(totalProdQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// total orders
const totalOrders = (req, res) => {
  try {
    const totalOrderQry = `select count(*) as total_order from order_information where order_status = 0`;
    con.query(totalOrderQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const totalOffers = (req, res) => {
  try {
    const totalOrderQry = `select count(*) as total_offer from promo_code`;
    con.query(totalOrderQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//all products whose quantity less then 10
const lessQuantity = (req, res) => {
  try {
    const lessQtyQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product where deleted = 0 and quantity < 10`;
    con.query(lessQtyQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const formatedDate = moment().format("Do-MMM-YYYY");
const addQuantity = (req, res) => {

  try {
    const addQtyQry = `insert into stock ( product_id, added_quantity, entry_date) values ('${req.body.product_id}',${req.body.added_quantity},'${formatedDate}')`;
    con.query(addQtyQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result, "result");
        if (result.affectedRows > 0) {
          let addedQuantity = Number(req.body.added_quantity);

          const updateQuantityQry = `update product set quantity = quantity + ${addedQuantity} where product_id = '${req.body.product_id}'`;
          con.query(updateQuantityQry, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              res.send({ result: result, status: 1 });
              console.log("updated ");
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updateQuantity = (req, res) => {
  try {
    const updateQuantityQry = `update product set quantity = '${req.body.quantity}' where product_id = '${req.body.product_id}'`;
    con.query(updateQuantityQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// order chart
const OrderDataChart = async (req, res) => {
  try {
    const sqlForColumnChart = `SELECT COUNT(order_id) as countOrder, DATE_FORMAT(order_date, '%Y-%m') AS monthDate FROM order_information where order_status = 4 GROUP BY monthDate;`;
    const responseForColumnChart = await new Promise((resolve, reject) => {
      con.query(sqlForColumnChart, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          if (result.length > 0) {
            resolve({ status: 1, result: result, msg: "Order Found" });
          } else {
            resolve({ status: 0, result: [], msg: "Order Not Found" });
          }
        }
      });
    });

    const sqlForPieChart = `SELECT SUM(total_amount) as orderAmount, DATE_FORMAT(order_date, '%Y-%m') AS monthDate FROM order_information where order_status = 4 GROUP BY monthDate;`;
    const responseForPieChart = await new Promise((resolve, reject) => {
      con.query(sqlForPieChart, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          if (result.length > 0) {
            resolve({ status: 1, result: result, msg: "Order Found" });
          } else {
            resolve({ status: 0, result: [], msg: "Order Not Found" });
          }
        }
      });
    });

    const sqlForUserChart = `SELECT COUNT(user_id) as countUser, DATE_FORMAT(registration_at, '%Y-%m') AS monthDate FROM user_registration GROUP BY monthDate;`;
    const responseForUserChart = await new Promise((resolve, reject) => {
      con.query(sqlForUserChart, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          if (result.length > 0) {
            resolve({ status: 1, result: result, msg: "user Found" });
          } else {
            resolve({ status: 0, result: [], msg: "user Not Found" });
          }
        }
      });
    });

    const totalOfferAmount = `SELECT SUM(discount_amount) as offerAmount, DATE_FORMAT(order_date, '%Y-%m') AS monthDate FROM order_information where order_status = 4 GROUP BY monthDate;`;
    const responseForTotalOffer = await new Promise((resolve, reject) => {
      con.query(totalOfferAmount, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          if (result.length > 0) {
            resolve({ status: 1, result: result, msg: "Order Found" });
          } else {
            resolve({ status: 0, result: [], msg: "Order Not Found" });
          }
        }
      });
    });

    console.log(
      responseForColumnChart,
      responseForPieChart,
      responseForUserChart,
      responseForTotalOffer
    );

    const columnResultOfCounter = [];
    const columnResultOfCategories = [];

    for (let index = 0; index < responseForColumnChart.result.length; index++) {
      const singleRecordData = responseForColumnChart.result[index];
      if (singleRecordData.monthDate !== null) {
        columnResultOfCounter.push(singleRecordData.countOrder);
        columnResultOfCategories.push(singleRecordData.monthDate);
      }
    }

    const pieResultOfCounter = [];
    const pieResultOfCategories = [];
    for (let index = 0; index < responseForPieChart.result.length; index++) {
      const singleRecordData = responseForPieChart.result[index];
      if (singleRecordData.monthDate !== null) {
        pieResultOfCounter.push(singleRecordData.orderAmount);
        pieResultOfCategories.push(singleRecordData.monthDate);
      }
    }

    const userResultCount = [];
    const UserResultOfCategories = [];

    for (let index = 0; index < responseForUserChart.result.length; index++) {
      const singleRecordData = responseForUserChart.result[index];
      if (singleRecordData.monthDate !== null) {
        userResultCount.push(singleRecordData.countUser);
        UserResultOfCategories.push(singleRecordData.monthDate);
      }
    }

    const OfferAmount = [];
    const totalOfferAmountResult = [];

    for (let index = 0; index < responseForTotalOffer.result.length; index++) {
      const singleRecordData = responseForTotalOffer.result[index];
      if (singleRecordData.monthDate !== null) {
        OfferAmount.push(singleRecordData.offerAmount);
        totalOfferAmountResult.push(singleRecordData.monthDate);
      }
    }

    const responseobject = {
      columnChartData: {
        categories: columnResultOfCategories,
        result: columnResultOfCounter,
      },
      pieChartData: {
        categories: pieResultOfCategories,
        result: pieResultOfCounter,
      },
      UserChartData: {
        categories: UserResultOfCategories,
        result: userResultCount,
      },
      totalofferData: {
        categories: totalOfferAmountResult,
        result: OfferAmount,
      },
    };
    res.send({ status: 1, result: responseobject, msg: "Order Found" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 0, result: [], msg: "Internal Server Error" });
  }
};

module.exports = {
  totalUser,
  totalProduct,
  lessQuantity,
  updateQuantity,
  addQuantity,
  totalOrders,
  totalOffers,
  OrderDataChart,
};
