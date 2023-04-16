const con = require("../database");
var bodyParser = require("body-parser");

// get data for
const getProductDataUser = (req, res) => {
  try {
    let start_page =
      (parseInt(req.params.page) - 1) * parseInt(req.params.perPage);
    let paramPerPage = parseInt(req.params.perPage);
    console.log(start_page, "starting page");
    console.log(req.params.perPage, "perpage");
    const GetProdDataQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product limit ${start_page},${paramPerPage}`;
    con.query(GetProdDataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const getproductList = `Select COUNT(*) as count from product `;
          con.query(getproductList, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              res.send({
                status: 1,
                result: result,
                totaldata: result1[0].count,
                msg: "Product List",
              });
            }
          });
        } else {
          res.send({ status: 0, result: [], msg: "Product Not Found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get gold products
const getGoldProductDataUser = (req, res) => {
  try {
    let start_page =
      (parseInt(req.params.page) - 1) * parseInt(req.params.perPage);
    let paramPerPage = parseInt(req.params.perPage);
    console.log(start_page, "starting page");
    console.log(req.params.perPage, "perpage");
    const GetProdDataQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product where jwellary_type = "Gold" limit ${start_page},${paramPerPage}`;
    con.query(GetProdDataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const getproductList = `Select COUNT(*) as count from product where jwellary_type = "Gold"`;
          con.query(getproductList, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              console.log(result, "gold");
              res.send({
                status: 1,
                result: result,
                totaldata: result1[0].count,
                msg: "Gold Product List",
              });
            }
          });
        } else {
          res.send({ status: 0, result: [], msg: "Product Not Found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get gold products
const getSilverProductDataUser = (req, res) => {
  try {
    let start_page =
      (parseInt(req.params.page) - 1) * parseInt(req.params.perPage);
    let paramPerPage = parseInt(req.params.perPage);
    // let intStartPage = parseInt(start_page)
    console.log(start_page, "starting page");
    console.log(req.params.page, "swdwd page");

    console.log(req.params.perPage, "perpage");

    const GetProdDataQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product where jwellary_type = "Silver" limit ${start_page},${paramPerPage}`;
    con.query(GetProdDataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const getproductList = `Select COUNT(*) as count from product where jwellary_type = "Silver"`;
          con.query(getproductList, (error1, result1) => {
            if (error1) {
              console.log(error1);
            } else {
              console.log(result, "silver");
              res.send({
                status: 1,
                result: result,
                totaldata: result1[0].count,
                msg: "Silver Product List",
              });
            }
          });
        } else {
          res.send({ status: 0, result: [], msg: "Product Not Found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getProductDataUser,
  getGoldProductDataUser,
  getSilverProductDataUser,
};
