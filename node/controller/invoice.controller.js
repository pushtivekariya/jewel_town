const con = require("../database");
var bodyParser = require("body-parser");
var pdf = require("html-pdf");
const path = require("path");
var nodemailer = require("nodemailer");
var InvoiceTemplate = require("./invoice");
const Invoice = async (req, res) => {
  try {
    let invoiceData = req.body;
    console.log(invoiceData, "invoice data");
    let newPath = path.join(`${__dirname}/../public/assets/invoices`);
    pdf
      .create(InvoiceTemplate(invoiceData), {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: "/dev/null",
          },
          pageFormat: "A4",
          renderDelay: 3000,
        },
      })

      .toFile(`${newPath}/${invoiceData.order_id}.pdf`, async (arr) => {
        if (arr) {
          return console.log("invoice not generated");
        } else {
          const response = { filename: `${invoiceData.order_id}.pdf` };
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
            subject: " Invoice For Your Recent Purchase At Jewel Town",
            text: `Dear ${req.body.user_name},
             
                          We hope this email finds you well. On behalf of Jewel Town, we would like to thank you for choosing our store for your jewelry needs.
                          We appreciate your business and hope that you are happy with your recent purchase.
                          As per our records, we have prepared an invoice for your purchase, which is attached to this email in PDF format. The details of the invoice are as follows:


                    Best regards,
                    Jewel Town     
                    `,
            attachments: [
              {
                filename: `${invoiceData.user_name}.pdf`,
                path: `${newPath}/${invoiceData.order_id}.pdf`,
              },
            ],
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
        }
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Invoice,
};
