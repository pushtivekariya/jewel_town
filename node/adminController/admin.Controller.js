const con = require("../database");
var bodyParser = require("body-parser");
var md5 = require("md5");
var nodemailer = require("nodemailer");

// for insert category data

var addcategory = (req, res) => {
  try {
    console.log(req.body);
    // const addcategory = `insert into category(category_name,category-type) values ('${req.body.category_name}','${req.body.category_type}')`
    const addcategory_qry = `INSERT INTO category( category_name, category_type) VALUES ('${req.body.category_name}',${req.body.category_type})`;
    con.query(addcategory_qry, (error, result) => {
      if (error) {
        console.log(error);
        console.log("category not added");
      } else {
        res.send({ result: result, status: 1 });
        console.log(result);
        console.log("category added");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get category data
const getCategoryData = (req, res) => {
  try {
    console.log(req.body);
    const getCategory_qry = `select  * from category where deleted =0`;
    // qqqqqqqq
    con.query(getCategory_qry, (error, result) => {
      if (error) {
        console.log(error);
        console.log("not get");
      } else {
        res.send({ result: result, status: 1 });
        console.log(result);
        console.log("get");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// add subcategory data

const addsubcategory = (req, res) => {
  try {
    console.log(req.body);
    const addsubcategory_qry = `INSERT INTO subcategory( product_name_id, category_gender, category_type, size_id) VALUES ('${req.body.product_name_id}','${req.body.category_gender}','${req.body.category_type}','${req.body.size_id}') `;
    con.query(addsubcategory_qry, (error, result) => {
      if (error) {
        console.log(error);
        console.log("subcategory not inserted");
      } else {
        res.send({ result: result, status: 1 });
        console.log(result);
        console.log("subcategory  added");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// add products
const addProduct = (req, res) => {
  try {
    console.log(req.body, "1111111111111");
    console.log(req.files, "222222");
    const addProduct = `INSERT INTO product( product_name_id,short_description, gender, jwellary_type ,jewellary_purity,weight,  price, quantity, description) VALUES ('${req.body.product_name_id}','${req.body.short_description}','${req.body.gender}','${req.body.jwellary_type}','${req.body.jewellary_purity}','${req.body.weight}',${req.body.price},${req.body.quantity},'${req.body.description}')`;

    con.query(addProduct, (error, result) => {
      if (error) {
        console.log(error);
        console.log("product not inserted");
      } else {
        // res.send({ result: result, status: 1, message: "product added" });
        console.log(result);
        console.log("product  added successfully");

        // console.log(affectedRows);
        if (result.affectedRows > 0) {
          const product_id = result.insertId;
          console.log(product_id);

          for (let index = 0; index < req.files.product_image.length; index++) {
            const singleFileRecord = req.files.product_image[index];
            console.log(singleFileRecord, "File Single Record");
            const insertImages = `insert into product_media (product_id,image_url) values ('${product_id}','${singleFileRecord.name}')`;
            con.query(
              insertImages,
              (insertImages_error, insertImages_result) => {
                if (insertImages_error) {
                  console.log(insertImages_error);
                } else {
                  console.log(
                    `${__dirname}/../public/assets/productImages/${singleFileRecord.name}`
                  );

                  singleFileRecord.mv(
                    `${__dirname}/../public/assets/productImages/${singleFileRecord.name}`,
                    (err) => {
                      console.log("error", err);
                    }
                  );
                  console.log("Called");
                  console.log(`${__dirname}`, "dirnameeeeeeeeeeee");
                  console.log(insertImages_result, "result");
                  console.log(singleFileRecord.name, "single file");
                  // res.send({result:result,status:1,message:'image inserted'})
                }
              }
            );
          }
          res.send({ result: result, status: 1, message: "image inserted" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//admin login
const login = (req, res) => {
  try {
    const login_qry = `select * from admin_information where admin_name='${
      req.body.admin_name
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

const user_data = (req, res) => {
  try {
    const UserDataQry = `select * from user_registration`;
    con.query(UserDataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({
          result: result,
          status: 1,
          message: "user registration data fetched",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// update category data
const updateCategory = (req, res) => {
  try {
    const updateCatQry = `UPDATE category SET category_name='${req.body.category_name}',category_type='${req.body.category_type}' WHERE category_id='${req.body.category_id}'`;
    con.query(updateCatQry, (error, result) => {
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

const AddProductName = (req, res) => {
  try {
    console.log(req.body);
    const ProdNameQry = `INSERT INTO product_name(product_names) VALUES ('${req.body.product_names}')`;
    con.query(ProdNameQry, (error, result) => {
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

// get product name data
const getProdNameData = (req, res) => {
  try {
    const ProdNameDataQry = "select * from product_name where deleted=0";
    con.query(ProdNameDataQry, (error, result) => {
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

// get subcategory data
const getSubcategory = (req, res) => {
  try {
    // const GetSubCatQry = `select * from subcategory`
    // const GetSubCatQry = `select *  from subcategory join  product_name on  subcategory.product_name_id = product_name.product_name_id join jwellary_size  on product_name.product_name_id = jwellary_size.product_name_id`
    const GetSubCatQry =
      "select *,(select product_names from product_name where product_name.product_name_id = subcategory.product_name_id group by product_name_id) as  product_names ,(select size from jwellary_size where jwellary_size.size_id = subcategory.size_id group by size_id) as  size_name from subcategory where deleted = 0";
    // const GetSubCatQry = "select subcategory_id,category_gender,category_type,(select product_names from product_name where product_name.product_name_id = subcategory.product_name_id group by product_name_id) as  product_names ,(select size from jwellary_size where jwellary_size.product_name_id = subcategory.product_name_id group by product_name_id) as  size_name from subcategory where deleted = 0";
    con.query(GetSubCatQry, (error, result) => {
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

// update sub category
const UpdateSubCat = (req, res) => {
  try {
    console.log(req.body, "ooooooo");
    const SubCatUpdateQry = `UPDATE subcategory SET product_name_id='${req.body.product_name_id}',category_gender='${req.body.category_gender}',category_type='${req.body.category_type}',size_id='${req.body.size_id}' WHERE subcategory_id='${req.body.subcategory_id}' `;
    con.query(SubCatUpdateQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
        console.log("updated ");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// add product size
const prod_size = (req, res) => {
  try {
    const prodSizeQry = `INSERT INTO jwellary_size( product_name_id, size) VALUES ('${req.body.product_name_id}','${req.body.size}')`;
    con.query(prodSizeQry, (error, result) => {
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
// get size data
const sizedata = (req, res) => {
  try {
    const getSizeQry = `select * from jwellary_size where product_name_id=${req.params.product_name_id}`;
    con.query(getSizeQry, (error, result) => {
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

// get size data
const sizedataTable = (req, res) => {
  try {
    const getSizeQry = `select * ,(select product_names from product_name where product_name.product_name_id = jwellary_size.product_name_id group by product_name_id) as  product_names from jwellary_size where deleted = 0 `;
    con.query(getSizeQry, (error, result) => {
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

// update size data
const updateSize = (req, res) => {
  try {
    const updateSizeQry = ` UPDATE jwellary_size SET product_name_id='${req.body.product_name_id}',size='${req.body.size}' WHERE size_id='${req.body.size_id}'`;
    con.query(updateSizeQry, (error, result) => {
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

// delete product name
const delProdName = (req, res) => {
  try {
    const delProdNameQry = `UPDATE product_name SET deleted=1 WHERE product_name_id='${req.params.product_name_id}'`;
    con.query(delProdNameQry, (error, result) => {
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

// get multiple image data
const getImagesData = (req, res) => {
  try {
    const getImageQry = `select * from product_media order by product_id`;
    con.query(getImageQry, (error, result) => {
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

// delete size data
const deleteSizeFunc = (req, res) => {
  try {
    const deleteSizeQry = `UPDATE jwellary_size SET deleted=1 WHERE  size_id=${req.params.size_id}`;
    con.query(deleteSizeQry, (error, result) => {
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

// delete category data
const deleteCategoryFunc = (req, res) => {
  try {
    const deleteCategoryQry = `UPDATE category SET deleted=1 WHERE category_id=${req.params.category_id}`;
    con.query(deleteCategoryQry, (error, result) => {
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

const deleteSubCategory = (req, res) => {
  try {
    const deleteSubCatQry = `UPDATE subcategory SET deleted=1 WHERE subcategory_id=${req.params.subcategory_id}`;
    con.query(deleteSubCatQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1 });
        // console.log('deleted');
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// block user
const BlockUser = (req, res) => {
  try {
    const BlockUserQry = `UPDATE user_registration SET status = 1 WHERE user_id = ${req.params.user_id}`;
    con.query(BlockUserQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
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
          subject: "Notification of Account Block",
          text: `Dear  ${req.params.email},
          
                          I am writing to inform you that your account on Jeweltown has been blocked due to a violation of our site's privacy and policy.
                          We take these violations very seriously in order to ensure the safety and privacy of all users on our platform.
                        
                          The specific behavior that led to your account being blocked was [insert specific behavior that violates the site's policy].
                          As a result, you will no longer be able to access your account on Jeweltown.
                          
                          Thank you for your understanding and cooperation in ensuring a safe and respectful environment on our site.
                       

               
                Sincerely,
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

        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// active user
const activeUser = (req, res) => {
  try {
    const activeUserQry = `UPDATE user_registration SET status = 0 WHERE user_id = ${req.params.user_id}`;
    con.query(activeUserQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
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
          subject: "Notification of Account UnBlock",
          text: `Dear  ${req.params.email},
          
                          I am writing to inform you that your account on Jeweltown has been blocked due to a violation of our site's privacy and policy.
                          We take these violations very seriously in order to ensure the safety and privacy of all users on our platform.
                        
                          The specific behavior that led to your account being blocked was [insert specific behavior that violates the site's policy].
                          As a result, you will no longer be able to access your account on Jeweltown.
                          
                          Thank you for your understanding and cooperation in ensuring a safe and respectful environment on our site.
                       

               
                Sincerely,
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

        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// update product
const updateProduct = (req, res) => {
  try {
    const updateProductQry = `UPDATE product SET product_name_id='${req.body.product_name_id}',short_description='${req.body.short_description}',gender='${req.body.gender}',jwellary_type='${req.body.jwellary_type}',jewellary_purity='${req.body.jewellary_purity}',weight='${req.body.weight}',price=${req.body.price},quantity=${req.body.quantity},description='${req.body.description}' WHERE product_id='${req.body.product_id}'`;
    con.query(updateProductQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        // res.send({ result: result, status: 1 });
        // if (result.affectedRows > 0) {
        //   const product_id = result.insertId;
        //   for (let index = 0; index < req.files.product_image.length; index++) {
        //     const singleFileRecord = req.files.product_image[index];
        //     console.log(singleFileRecord, "File Single Record");

        //     const updateImagesQry = `update product_media set image_url=${singleFileRecord.name}' where product_id=${product_id}`;
        //     con.query(
        //       updateImagesQry,
        //       (updateImage_error, updateImage_result) => {
        //         if (updateImage_error) {
        //           console.log(updateImage_error);
        //         } else {
        //           console.log(
        //             `${__dirname}/../public/assets/productImages/${singleFileRecord.name}`
        //           );

        //           singleFileRecord.mv(
        //             `${__dirname}/../public/assets/productImages/${singleFileRecord.name}`,
        //             (err) => {
        //               console.log("error", err);
        //             }
        //           );
        //           console.log("Called");
        //           console.log(`${__dirname}`, "dirnameeeeeeeeeeee");
        //           console.log(insertImages_result, "result");
        //           console.log(singleFileRecord.name, "single file");
        //           res.send({
        //             result: updateImage_result,
        //             status: 1,
        //             message: "image updated",
        //           });
        //         }
        //       }
        //     );
        //   }
        //   console.log("product updated");
        // }
        res.send({ result: result, status: 1, message: "product updated" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get product data for home page and admin product datatable (this for both )
const getProductData = (req, res) => {
  try {
    const GetProdDataQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product limit 16 `;
    con.query(GetProdDataQry, (error, result) => {
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

// get product data for datatable
const getprodDatatable = (req, res) => {
  try {
    const datatableProdQry = `select *,(select product_names from product_name where product_name.product_name_id = product.product_name_id group by product_name_id) as  product_names ,(select image_url from product_media where product_media.product_id = product.product_id group BY product_id ) as image_url from product where deleted = 0`;
    con.query(datatableProdQry, (error, result) => {
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

// delete product data
const deleteProdData = (req, res) => {
  try {
    const deleteProdQry = `UPDATE product SET deleted = 1 WHERE product_id = ${req.params.product_id}`;
    // UPDATE user_registration SET status = 0 WHERE user_id = ${req.params.user_id}
    con.query(deleteProdQry, (error, result) => {
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

// get product stock data
const getStockData = (req, res) => {
  try {
    const getStockDataQry = `select *,(select short_description from product where product.product_id = stock.product_id) as product_name from stock`;
    con.query(getStockDataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "stock data get" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addcategory,
  getCategoryData,
  addsubcategory,
  addProduct,
  login,
  user_data,
  updateCategory,
  AddProductName,
  getProdNameData,
  getSubcategory,
  UpdateSubCat,
  prod_size,
  sizedata,
  updateSize,
  delProdName,
  sizedataTable,
  getProductData,
  deleteSizeFunc,
  deleteCategoryFunc,
  deleteSubCategory,
  BlockUser,
  getImagesData,
  updateProduct,
  getprodDatatable,
  activeUser,
  deleteProdData,
  getStockData,
};
