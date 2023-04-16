const con = require("../database");
var bodyParser = require("body-parser");

const promocode = (req, res) => {
  try {
    const matchpromo = `select * from promo_code where promocode = '${req.body.promocode}'`;
    con.query(matchpromo, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          res.send({
            result: result,
            status: 0,
            message: "promocode already exists",
          });
          console.log("promocode alredy.....");
        } else {
          const insertPromoQry = `insert into promo_code ( promocode, promocode_type, promocode_discount_amount, start_date, end_date, no_of_use, minimum_order_amount) values ('${req.body.promocode}','${req.body.promocode_type}','${req.body.promocode_discount_amount}','${req.body.start_date}','${req.body.end_date}','${req.body.no_of_use}','${req.body.minimum_order_amount}')`;
          con.query(insertPromoQry, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              res.send({
                result: result,
                status: 1,
                message: "inserted promocode",
              });
              console.log("promocode insert....");
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get promocode data or information
const promocodeData = (req, res) => {
  try {
      const getPromoDataQry = `select * from promo_code where status = 0`;
      con.query(getPromoDataQry,(error,result)=>{
        if (error) {
            console.log(error);
        } else {
            res.send({result:result,status:1,message:"promocode data are get"})
        }
      })
  } catch (error) {
    console.log(error);
  }
};

// deactive promocodes  or delete promocodes
const deactivePromocodes = (req,res)=>{
    try {
        const deactivePromoQry = `update promo_code set status = 1 where promocode_id='${req.params.promocode_id}'`;
        con.query(deactivePromoQry,(error,result)=>{
            if (error) {
                console.log(error);
            } else {
                res.send({result:result,status:1})
            }
        })
    } catch (error) {
        console.log(error);
    }
}





module.exports = {
  promocode,
  promocodeData,
  deactivePromocodes
};
