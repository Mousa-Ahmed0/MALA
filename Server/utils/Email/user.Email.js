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
        <div style="width: calc(100% - 2rem); height: 100%; background-color: #202d36 !important; padding: 1rem !important; margin: 0 autot !important;">
          <h1 style="font-size:2.575rem !important;font-bold:800 !important;color:#0566a8 !important; margin: 0 auto !important;">MALM:</h1>
          <hr style="color: #FFFF !important; margin: 1rem 0 !important;" />
          <div style="font-size:1.275rem !important;color:#FFFF !important;line-height:1.25 !important;">
              <p style="font-size:1.275rem !important;color:#FFFF !important;line-height:1.25 !important;">${option.massage}</p>
          </div>
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
      <div style="width: calc(100% - 2rem); height: 100%; background-color: #202d36 !important; padding: 1rem !important; margin: 0 autot !important;">
          <h1 style="font-size:2.575rem !important;font-bold:800 !important;color:#0566a8 !important; margin: 0 auto !important;">MALM:</h1>
          <hr style="color: #FFFF !important; margin: 1rem 0 !important;" />
          <div style="font-size:1.275rem;color:#000000 !important;line-height:1.25;">
              <p style="font-size:1.275rem;color:#000000 !important;line-height:1.25">
                <a style="background-color: #226597; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;"
                href="${optionRest.link}" > 
                Rest Password
                </a>
              </p>
          </div>
          </div
          `, // html body
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
