var nodemailer = require("nodemailer");
module.exports.nodemailer = (data, logoutmail, usersubject) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harman.eminence@gmail.com",
      pass: "emi#@123 ",
    },
  });

  var mailOptions = {
    from: "harman.eminence@gmail.com",
    // to: "hs802686@gmail.com",
    to: logoutmail,
    // subject: "Sending Email using Node.js",
    subject: usersubject,
    text: "That was easy!",
    html: " <h1>Logout</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// W3 school
