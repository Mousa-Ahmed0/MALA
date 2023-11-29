const asyncHandler = require("express-async-handler");
const { payments } = require("../models/payments");

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
  res.status(201).json({ newPayment, message: "done....." });
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
  const getAllPayment = await payments.find();
  if (getAllPayment) {
    let count = 0;
    for (let i = 0; i < getAllPayment.length; i++) {
      count += getAllPayment[i].value;
    }
    res.status(201).json({ count, getAllPayment, message: "done....." });
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
  if (count) res.status(201).json({ count, message: "done....." });
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
  const getPayment = await payments.find({
    identPatient: req.body.identPatient,
  });
  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      count += getPayment[i].value;
    }
    res.status(201).json({ count, getPayment, message: "done....." });
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
  console.log(getPayment)
  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      count += getPayment[i].value;
    }
    res.status(201).json({ count, getPayment, message: "done....." });
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
  const getPayment = await payments.find({
    payDate: { $gte: firstDate, $lte: secondtDate }
  });
  if (getPayment) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      count += getPayment[i].value;
    }
    res.status(201).json({ count, getPayment, message: "done....." });
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
  const paymentDate = new Date(req.body.payDate);
  console.log(paymentDate.getDate());
  console.log(paymentDate.getMonth() + 1);
  console.log(paymentDate.getFullYear() );
  // const getPayment = await payments.find({ payDate: paymentDate });
  // console.log(getPayment)
  // if (getPayment) {
  //   let count = 0;
  //   for (let i = 0; i < getPayment.length; i++) {
  //     count += getPayment[i].value;
  //   }
  //   res.status(201).json({ count, getPayment, message: "done....." });
  // } else res.status(400).json({ message: "Can't find repoet" });
  res.status(400).json({ message: "Can't find repoet" });

});