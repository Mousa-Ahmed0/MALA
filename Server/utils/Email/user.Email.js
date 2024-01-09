const nodemailer = require("nodemailer");

module.exports.sendEmail = async (option) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: "ma5055928@gmail.com", // sender address
      to: option.email, // list of receivers
      subject: option.subject, // Subject line
      html: `
          <div style="font-size:2.5rem;color:#113f67 !important; display:flex;justify-content:center;">MALM</div>
          <div style="font-size:1.275rem;color:#000000 !important;line-height:1.25;">
              <p style="font-size:1.275rem;color:#000000 !important;line-height:1.25">${option.massage}</p>
          </div>
          `, // html body
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};

module.exports.sendEmailForRestPassword = async (optionRest) => {
  console.log(optionRest.email);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: "ma5055928@gmail.com", // sender address
      to: optionRest.email, // list of receivers
      subject: "Reset of password", // Subject line
      html: `
          <div style="font-size:2.5rem;color:#113f67 !important; display:flex;justify-content:center;">MALM</div>
          <div style="font-size:1.275rem;color:#000000 !important;line-height:1.25;">
              <p style="font-size:1.275rem;color:#000000 !important;line-height:1.25">
                <a style="background-color: #f44336; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;"
                href="${optionRest.link}">
                Rest Password
                </a>
              </p>
          </div>
          `, // html body
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
