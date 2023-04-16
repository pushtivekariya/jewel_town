const moment = require("moment/moment");
const con = require("../database");
const bodyParser = require("body-parser");

const formatedDate = moment().format('Do-MMM-YYYY')
//  add product review user side
const addreview = (req, res) => {
  console.log(req.params, "paramssss");
  try {

    const AddReviewQry = `insert into product_review (user_id, product_id, review_title, review, rating, email, user_name,review_date) values (${req.body.user_id},${req.body.product_id},'${req.body.review_title}','${req.body.review}',${req.body.rating},'${req.body.email}','${req.body.user_name}','${formatedDate}')`;
   
    con.query(AddReviewQry, (error, result) => {
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

// get all review for admin
const reviewData = (req, res) => {
  try {
    const getReviewQry = `select * ,(select profile_photo from user_registration where user_registration.user_id = product_review.user_id limit 1) as profile_photo,(select short_description from product where product.product_id = product_review.product_id) as product_name from product_review `;
    con.query(getReviewQry, (error, result) => {
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

// get reviews for user side
const reviewDataUser = (req, res) => {
  try {
    const getUserReviewQry = `select * ,(select profile_photo from user_registration where user_registration.user_id = product_review.user_id limit 1) as profile_photo,(select short_description from product where product.product_id = product_review.product_id) as product_name from product_review where product_id = ${req.params.product_id} `;
    con.query(getUserReviewQry, (error, result) => {
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
module.exports = {
  addreview,
  reviewData,
  reviewDataUser
};
