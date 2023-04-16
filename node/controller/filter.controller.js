const con = require("../database");
var bodyParser = require("body-parser");

var filterProduct = (req, res) => {
  try {
    console.log(req.body, "!!!!!!!!!!!!!");
    let subsql = "";
    if (req.body.jwellery_type != "" && req.body.jwellery_type != "0") {
      subsql += `${subsql != "" ? " AND " : ""}  product.jwellary_type='${
        req.body.jwellery_type
      }'`;
    }
    if (req.body.gender != "" && req.body.gender != "0") {
      subsql += `${subsql != "" ? " AND " : ""}  product.gender='${
        req.body.gender
      }'`;
    }

    if (req.body.price != "All" && req.body.price != "0") {
      const priceData = req.body.price?.split("-");
      subsql += `${subsql != "" ? " AND " : ""}  product.price >= ${

        priceData[0]
      } AND product.price <= ${priceData[1]} `;
    }
    if (req.body.product_name_id != "" && req.body.product_name_id != "0") {
      subsql += `${subsql != "" ? " AND " : ""}  product.product_name_id = ${
        req.body.product_name_id
      }`;
    }
    const productdata = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product ${subsql != "" ? "where" : ""} ${subsql} `;
    console.log(productdata,'productdata');

    con.query(productdata, (error, result) => {
      // console.log(error,'error');
      console.log(result,'result');
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          res.send({ status: 1, data: result, msg: "Product List" });
        } else {
          res.send({ status: 0, data: [], msg: "Product Not Found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  filterProduct,
};