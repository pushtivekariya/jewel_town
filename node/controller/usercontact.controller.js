const con = require("../database");
const bodyParser = require("body-parser");

//insert contact details for user
const userContact = (req,res) => {
    try {
        const contactQuery = `INSERT INTO user_contact(name, email, comment) VALUES ('${req.body.name}','${req.body.email}','${req.body.comment}')`;
  con.query(contactQuery,(error,result) => {
    if (error) {
        console.log(error);
    } else {
        res.send({result:result,status : 1})
    }
  })
    } catch (error) {
        console.log(error);
    }
  
}

module.exports = {
    userContact
}