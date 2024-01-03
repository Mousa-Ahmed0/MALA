const nodemailer = require("nodemailer");

module.exports.sendEmail=async (option)=>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
    },
});

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: '"Fred Foo 👻" <ma5055928@gmail.com', // sender address
    to: option.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
          <div style="background:#f1f1f1;color:#000">
           <p style="color:#f1f1f1">${option.massage}</p>
          </div>
          `, // html body
  },(err,info)=>{
      if(err)
        console.log(err);
      else
        console.log(info);
  });
}
