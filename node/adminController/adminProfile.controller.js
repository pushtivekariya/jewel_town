const con = require("../database");
var bodyParser = require("body-parser");
var md5 = require("md5");
const moment = require("moment/moment");
const formatedDate = moment().format("Do-MMM-YYYY");
const profileData = (req, res) => {
  try {
    const profiledataQry = `select * from admin_information where id='${req.params.id}'`;
    console.log(req.params.id, "id");
    con.query(profiledataQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result, "result");
        res.send({ result: result, status: 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// update admin profile
const updateProfile = (req, res) => {
  try {
    const imagefile = req.files.admin_image;

    const updateProfileQry = `update admin_information set admin_name='${req.body.admin_name}' ,email="${req.body.email}",date_of_birth='${req.body.date_of_birth}',contact_no=${req.body.contact_no},gender='${req.body.gender}' ,admin_bio ='${req.body.admin_bio}',modify_at='${formatedDate}',admin_image='${imagefile.name}' `;
    con.query(updateProfileQry, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        imagefile.mv(
          `${__dirname}/../public/assets/logo/${imagefile.name}`,
          (err) => {
            console.log("error", err);
          }
        );
        const updatedData = `select * from admin_information`;
        con.query(updatedData, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.send({ result: result, status: 1 });
            console.log(result, "result");
          }
        });
        console.log(result, "resu");
        console.log("updated");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  profileData,
  updateProfile,
};
