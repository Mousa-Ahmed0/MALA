const asyncHandler = require("express-async-handler");
const { payments } = require("../models/payments");
const { user } = require("../models/user");

/**-----------------------------------
 * @desc add payments
 * @router /api/payment/addPayment
 * @method POST
 * @access private (staff or admin )
 * year/month/day
 * 2023/09/05
 * -----------------------------------*/
module.exports.addPayment = asyncHandler(async (req, res) => {
  //vaildition @front end
  const newPayment = new payments({
    identPatient: req.body.identPatient,
    payDate: req.body.payDate,
    InsuranceCompName: req.body.InsuranceCompName,
    InsuranceCompPers: req.body.InsuranceCompPers,
    value: req.body.value,
    discountedValue: req.body.discountedValue,
  });
  if (newPayment.InsuranceCompPers && newPayment.InsuranceCompPers) {
    const pers = newPayment.InsuranceCompPers / 100; //pers
    newPayment.discountedValue = newPayment.value * pers; //discountedValue
    newPayment.value = newPayment.value - newPayment.value * pers; //value
  }
  await newPayment.save();
  res.status(201).json({ newPayment, message: "Reports generated successfully." });
});
/**-----------------------------------
 * @desc get all  payments
 * @router /api/payment/getPayment
 * @method GET
 * @access private (staff or admin )
 *  year/month/day
 * 2023/09/05
 * -----------------------------------*/
module.exports.getPayment = asyncHandler(async (req, res) => {
  //vaildition @front end
  // const getAllPayment = await payments.find().select("value -_id ");
  let usersArray = [];
  const getAllPayment = await payments.find();
  if (getAllPayment) {
    let count = 0;
    for (let i = 0; i < getAllPayment.length; i++) {
      const userinfo = await user.findOne({ ident: getAllPayment[i].identPatient });
      usersArray.push(userinfo);
      count += getAllPayment[i].value;
    }
    res.status(201).json({ count,usersArray, getAllPayment, message: "Reports generated successfully." });
  } else res.status(400).json({ message: "Can't find repoet" });
});

/**-----------------------------------
 * @desc get count payments
 * @router /api/payment/countPayment
 * @method GET
 * year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.countPayment = asyncHandler(async (req, res) => {
  //vaildition @front end
  const count = await payments.count();
  if (count) res.status(201).json({ count, message: "Reports generated successfully." });
  else res.status(400).json({ message: "Can't find repoet" });
});

/**-----------------------------------
 * @desc get payments  by identPatient
 * @router /api/payment/getPaymentIdentPatient
 * @method GET
 *  year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.getPaymentIdentPatient = asyncHandler(async (req, res) => {
  //vaildition @front end  
  let usersArray = [];

  const getPayment = await payments.find({
    identPatient: req.body.identPatient,
  });

  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      const userinfo = await user.findOne({ ident: getAllPayment[i].identPatient });
      usersArray.push(userinfo);
      count += getPayment[i].value;
    }
    res.status(201).json({ count, usersArray,getPayment, message: "Reports generated successfully." });
  } else res.status(400).json({ message: "Can't find repoet" });
});

/**-----------------------------------
 * @desc get payments  by identPatient
 * @router /api/payment/getByDate
 * @method GET 
 * year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.getByDate = asyncHandler(async (req, res) => {
  //vaildition @front end
  const paymentDate = new Date(req.body.payDate);
  const getPayment = await payments.find({ payDate: paymentDate });
  let usersArray = [];
  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      const userinfo = await user.findOne({ ident: getAllPayment[i].identPatient });
      usersArray.push(userinfo);
      count += getPayment[i].value;
    }
    res.status(201).json({ count, usersArray,getPayment, message: "Reports generated successfully." });
  } else res.status(400).json({ message: "Can't find repoet" });
});

/**-----------------------------------
 * @desc get payments  by identPatient
 * @router /api/payment/getFromToDate
 * @method GET
 * year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.getFromToDate = asyncHandler(async (req, res) => {
  //vaildition @front end
  const firstDate = new Date(req.body.firstDate);
  const secondtDate = new Date(req.body.secondtDate);
  let usersArray = [];
  const getPayment = await payments.find({
    payDate: { $gte: firstDate, $lte: secondtDate }
  });
  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      const userinfo = await user.findOne({ ident: getAllPayment[i].identPatient });
      usersArray.push(userinfo);
      count += getPayment[i].value;
    }
    res.status(201).json({ count, usersArray,getPayment, message: "Reports generated successfully." });
  } else res.status(400).json({ message: "Can't find repoet" });
});


/**-----------------------------------
 * @desc get payments  by identPatient
 * @router /api/payment/getByDate
 * @method GET
 * year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.test = asyncHandler(async (req, res) => {
  //vaildition @front end
  const number = req.body.number;
  const currentDate = new Date(req.body.payDate);
  const startDate = new Date(currentDate);

  let usersArray = [];
 
  if (number == 0) {//week
    startDate.setDate(currentDate.getDate() - 6);
    const getAllPayment = await payments.find({
      payDate: { $gte: startDate, $lte: currentDate }
    });

    if (getAllPayment) {
      let count = 0;
      for (let i = 0; i < getAllPayment.length; i++) {
        const userinfo = await user.findOne({ ident: getAllPayment[i].identPatient });
        usersArray.push(userinfo);
        count += getAllPayment[i].value;
      }
      res.status(201).json({ count,usersArray, getAllPayment, message: "Reports generated successfully." });

    } else {
      res.status(400).json({ message: "Can't find report" });
    }
  }
  else {//number of month
    startDate.setMonth(currentDate.getMonth() - number);
    console.log(startDate);

    const getAllPayment = await payments.find({
      payDate: { $gte: startDate, $lte: currentDate }
    });

    if (getAllPayment) {
      let count = 0;
      for (let i = 0; i < getAllPayment.length; i++) {
        count += getAllPayment[i].value;
      }
      res.status(201).json({ count, getAllPayment, message: "Reports generated successfully." });

    } else {
      res.status(400).json({ message: "Can't find report" });
    }
  }
});