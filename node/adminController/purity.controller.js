const con = require("../database");
var bodyParser = require("body-parser");

const AddPurity = (req, res) => {
  try {
    const addPurityQry = `insert into jewellary_purity (jwellary_type,purity_name) values('${req.body.jwellary_type}','${req.body.purity_name}')`;
    con.query(addPurityQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ result: result, status: 1, message: "purity inserted" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};


const getPurity = (req, res) => {
  try {
    const getPurityQry = `select * from jewellary_purity where status = 0`;
    con.query(getPurityQry, (error, result) => {
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

const deletePurity = (req,res) =>{
  try {
    const deletePurityQry = `update jewellary_purity set status =1 where purity_id = ${req.params.purity_id}`
    con.query(deletePurityQry,(error,result)=>{
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
  AddPurity,
  getPurity,
  deletePurity
};
