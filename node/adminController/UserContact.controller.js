const con = require('../database')
var bodyParser = require("body-parser")

// get User's contact information
const GetUserContact = (req,res)=>{
    try {
        const UserContactQry = `select * from user_contact`
        con.query(UserContactQry,(error,result)=>{
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

module.exports ={
    GetUserContact
}