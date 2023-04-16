const con = require("../database");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var md5 = require("md5");
// gyjjlyptdaclvtom : app Key of google mail
// pushtivekariya76@gmail.com   mail
const getUserList = (req, res) => {
  try {
    const getUserList = `select * from user_registration`;
    con.query(getUserList, (error, result) => {
      console.log(error, result);
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
      console.log("called");
    });
  } catch (error) {
    console.log(error);
  }
};
const dates = new Date();
console.log(dates);
// const yyyy = (dates.format())
const month = dates.getMonth() + 1;
const finalDate = dates.getFullYear() + "-" + month + "-" + dates.getDate();
console.log(finalDate);
const insert = (req, res) => {
  try {
    // console.log(dates);
    // document.write(req.body)
    console.log(req.body);

    const insert_qry = `INSERT INTO user_registration( user_name, email, contact_no, password, gender, date_of_birth ,registration_at,status) VALUES ('${
      req.body.user_name
    }','${req.body.email}','${req.body.contact_no}','${md5(
      req.body.password
    )}','${req.body.gender}','${req.body.date_of_birth}','${finalDate}','0')`;
    //  const insert_qry = `insert into user_registration (user_name,email,contact_no,password,gender,date_of_birth,registration_at,modified_at) values('pushti','pushti@gmail.com',8866341213,'Pushti@123','female','2023-01-31T18:30:00.000Z','2023-01-31T18:30:00.000Z','2023-01-31T18:30:00.000Z')`;
    // const insert_qry ="insert into user_registration (user_name) values('pushti')";
    console.log(insert_qry);
    con.query(insert_qry, (error, result) => {
      if (error) {
        res.send({ err: error });
      } else {
        res.send({ result: result, status: 1 });
        console.log(result);
        console.log("ins");
      }
      console.log("insert data successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = (req, res) => {
  try {
    // console.log(req.body);
    console.log(req.params);

    const delete_qry = `delete from user_registration where user_id = '${req.params.user_id}'`;
    con.query(delete_qry, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
        console.log("deleted record");
      }
      console.log("final delete");
    });
  } catch (error) {
    console.log(error);
  }
};

const updateData = (req, res) => {
  try {
    console.log(req.body, "hey");
    const imagefile = req.files.profile_photo;
    // console.log(req.params, "hey");
    const update_qry = `UPDATE user_registration SET user_name='${req.body.user_name}',email='${req.body.email}',contact_no='${req.body.contact_no}',modified_at='${finalDate}',profile_photo='${imagefile.name}' where user_id='${req.body.user_id}'`;
    con.query(update_qry, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        console.log(result, "result updated...");
        imagefile.mv(
          `${__dirname}/../public/assets/user_profile_images/${imagefile.name}`,
          (err) => {
            console.log("error", err);
          }
        );

        const updatedData = `select * from user_registration where user_id='${req.body.user_id}'`;
        con.query(updatedData, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.send({ result: result, status: 1 });
            console.log(result, "result");
          }
        });

      }
      console.log("updated data successfully");
    });
  } catch (error) {}
};

// for sending mail on checkout and payment confirmation
const email = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pushtivekariya76@gmail.com",
      pass: "slxveenczexilkoz",
    },
  });

  var mailOptions = {
    from: "pushtivekariya76@gmail.com",
    to: req.body.email,
    subject: "Purchase Confirmation",
    text: "Thanks for purchasing jewellary Of Our Royal brand ",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send({ result: info, status: 1, message: "sent" });
    }
  });
};

module.exports = {
  getUserList,
  insert,
  deleteUser,
  updateData,
  // ShipAddress,
  email,
};
