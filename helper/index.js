var nodemailer = require("nodemailer");
module.exports.nodemailer = (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harman.eminence@gmail.com",
      pass: "emi#@123 ",
    },
  });
  console.log(data, "ppppppppp");
  console.log(data.data.email, "llllllll");
  var mailOptions = {
    from: "harman.eminence@gmail.com",
    // to: "hs802686@gmail.com",
    to: data.data.email,
    // subject: "Sending Email using Node.js",
    subject: data.data.subject,
    text: "That was easy!",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${data.data.name}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:8081/confirm/> Click here</a>
    </div>`,
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
