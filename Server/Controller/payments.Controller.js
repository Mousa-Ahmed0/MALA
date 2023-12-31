const asyncHandler = require("express-async-handler");
const { payments } = require("../models/payments");
const { user } = require("../models/user");
const { analyzeResult } = require("../models/patienResults");

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
    resultId: req.body.resultId,
    identPatient: req.body.identPatient,
    payDate: req.body.payDate,
    InsuranceCompName: req.body.InsuranceCompName,
    InsuranceCompPers: req.body.InsuranceCompPers,
    paiedvalue: req.body.paiedvalue,
    discountedValue: req.body.discountedValue,
    resultCostDetils: req.body.resultCostDetils,
    totalValue: req.body.totalValue
  });

  await newPayment.save();
  res
    .status(201)
    .json({ newPayment, message: "Reports generated successfully." });
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getPayment = await payments.find();
  let paumentArray = [];
  if (getPayment.length) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {

      const dayOfWeek = getPayment[i].payDate.getDay(); //find day
      const dayName = daysOfWeek[dayOfWeek]; //find name of day

      const resultInfo = await analyzeResult.findById(getPayment[i].resultId);
      console.log(resultInfo);
      console.log(getPayment[i].resultId);
      const userinfo = await user.findOne({
        ident: resultInfo.patientIdent,
      }).select('-password');
      getPayment[i].resultId
      const pymentDetails = {
        day: dayName,
        date: getPayment[i].payDate,
        result: resultInfo,
        value: getPayment[i].value,
        payment: getPayment[i],
        info: userinfo,
      };
      paumentArray.push(pymentDetails);
      count += getPayment[i].totalValue;
    }
    res.status(201).json({
      count,
      paumentArray,
      message: "Reports generated successfully.",
    });
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
  if (count)
    res.status(201).json({ count, message: "Reports generated successfully." });
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getPayment = await payments.find({});

  let paumentArray = [];
  if (getPayment.length) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {
      const resultInfo = await analyzeResult.findById(getPayment[i].resultId);
      const identPat = resultInfo.patientIdent;
      if (identPat == req.query.identPatient) {
        const userinfo = await user.findOne({ ident: identPat }).select('-password');
        if (userinfo) {
          const dayOfWeek = getPayment[i].payDate.getDay(); //find day
          const dayName = daysOfWeek[dayOfWeek]; //find name of day
          const pymentDetails = {
            day: dayName,
            date: getPayment[i].payDate,
            result: resultInfo,
            value: getPayment[i].value,
            payment: getPayment[i],
            info: userinfo,
          };
          paumentArray.push(pymentDetails);
          count += getPayment[i].totalValue;
        }
        else res.status(400).json({ message: "User not found......." });
      }
    }
    res.status(201).json({
      count,
      paumentArray,
      message: "Reports generated successfully.",
    });
  } else res.status(400).json({ message: "Can't find repoet" });
});

/**-----------------------------------
 * @desc get payments  by _id
 * @router /api/payment/getPaymentIdentPatient/:id
 * @method GET
 *  year/month/day
 * 2023/09/05
 * @access private (staff or admin )
 * -----------------------------------*/
module.exports.getPaymentId = asyncHandler(async (req, res) => {
  //vaildition @front end
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getPayment = await payments.findById(req.params.id);
  if (getPayment) {
    const dayOfWeek = getPayment.payDate.getDay(); //find day
    const dayName = daysOfWeek[dayOfWeek]; //find name of day

    const resultInfo = await analyzeResult.findById(getPayment.resultId);

    const identPat = resultInfo.patientIdent;
    const userinfo = await user.findOne({ ident: identPat }).select('-password');

    const pymentDetails = {
      day: dayName,
      date: getPayment.payDate,
      result: resultInfo,
      value: getPayment.value,
      payment: getPayment,
      info: userinfo,
    };

    res
      .status(201)
      .json({ pymentDetails, message: "Reports generated successfully." });
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
  const paymentDate = new Date(req.query.payDate);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getPayment = await payments.find({ payDate: paymentDate });
  let paumentArray = [];
  if (getPayment.length) {
    let count = 0;
    for (let i = 0; i < getPayment.length; i++) {

      const dayOfWeek = getPayment[i].payDate.getDay(); //find day
      const dayName = daysOfWeek[dayOfWeek]; //find name of day

      const resultInfo = await analyzeResult.findById(getPayment[i].resultId).select('-password');
      const userinfo = await user.findOne({
        ident: resultInfo.patientIdent,
      }).select('-password');
      const pymentDetails = {
        day: dayName,
        date: getPayment[i].payDate,
        result: resultInfo,
        value: getPayment[i].value,
        payment: getPayment[i],
        info: userinfo,
      };
      paumentArray.push(pymentDetails);
      count += getPayment[i].totalValue;
    }
    res.status(201).json({
      count,
      paumentArray,
      message: "Reports generated successfully.",
    });
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const firstDate = new Date(req.query.firstDate);
  const secondtDate = new Date(req.query.secondtDate);

  let paumentArray = [];

  const getAllPayment = await payments.find({
    payDate: { $gte: firstDate, $lte: secondtDate },
  });
  if (getAllPayment.length) {
    let count = 0;
    for (let i = 0; i < getAllPayment.length; i++) {

      const dayOfWeek = getAllPayment[i].payDate.getDay(); //find day
      const dayName = daysOfWeek[dayOfWeek]; //find name of day

      const resultInfo = await analyzeResult.findById(getAllPayment[i].resultId);
      const userinfo = await user.findOne({
        ident: resultInfo.patientIdent,
      }).select('-password');
      const pymentDetails = {
        day: dayName,
        date: getAllPayment[i].payDate,
        result: resultInfo,
        value: getAllPayment[i].value,
        payment: getAllPayment[i],
        info: userinfo,
      };
      paumentArray.push(pymentDetails);
      count += getAllPayment[i].totalValue;
    }
    res.status(201).json({
      count,
      paumentArray,
      message: "Reports generated successfully.",
    });
  } else {
    res.status(400).json({ message: "Can't find report" });
  }
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let responseSent = false; // Variable to track whether response has been sent
  const number = req.query.number;
  const currentDate = new Date(req.query.payDate);
  const startDate = new Date(currentDate);
  let paumentArray = [];

  if (number == 0) {//week
    startDate.setDate(currentDate.getDate() - 7);
    const getAllPayment = await payments.find({
      payDate: { $gte: startDate, $lte: currentDate },
    });
    if (getAllPayment.length) {
      let count = 0;
      for (let i = 0; i < getAllPayment.length; i++) {
        const dayOfWeek = getAllPayment[i].payDate.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day

        const resultInfo = await analyzeResult.findById(getAllPayment[i].resultId);
        const userinfo = await user.findOne({
          ident: resultInfo.patientIdent,
        }).select('-password');
        const pymentDetails = {
          day: dayName,
          date: getAllPayment[i].payDate,
          result: resultInfo,
          value: getAllPayment[i].value,
          payment: getAllPayment[i],
          info: userinfo,
        };
        paumentArray.push(pymentDetails);
        count += getAllPayment[i].totalValue;
      }
      if (!responseSent) {
        res.status(201).json({
          count,
          paumentArray,
          message: "Reports generated successfully.",
        });
        responseSent = true; // Set the flag to true to indicate response has been sent
      }
    } else {
      // Send the response if there are no results
      if (!responseSent) {
        responseSent = true; // Set the flag to true to indicate response has been sent
        res.status(400).json({ message: "Can't find report" });
      }
    }
  }
  else if (number >= 1 && number <= 12) {//number of month
    startDate.setMonth(currentDate.getMonth() - number);
    const getAllPayment = await payments.find({
      payDate: { $gte: startDate, $lte: currentDate },
    });

    if (getAllPayment.length) {
      let count = 0;
      for (let i = 0; i < getAllPayment.length; i++) {

        const dayOfWeek = getAllPayment[i].payDate.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day

        const resultInfo = await analyzeResult.findById(getAllPayment[i].resultId);
        const userinfo = await user.findOne({
          ident: resultInfo.patientIdent,
        }).select('-password');

        const pymentDetails = {
          day: dayName,
          date: getAllPayment[i].payDate,
          result: resultInfo,
          value: getAllPayment[i].value,
          payment: getAllPayment[i],
          info: userinfo,
        };
        paumentArray.push(pymentDetails);
        count += getAllPayment[i].totalValue;
      }
      if (!responseSent) {
        responseSent = true; // Set the flag to true to indicate response has been sent
        res.status(201).json({
          count,
          paumentArray,
          message: "Reports generated successfully.",
        });
      }
    } else {
      // Send the response if there are no results
      if (!responseSent) {
        responseSent = true; // Set the flag to true to indicate response has been sent
        res.status(400).json({ message: "Can't find report" });
      }
    }
  }
  if (!responseSent) {//error input
    responseSent = true; // Set the flag to true to indicate response has been sent
    res.status(400).json({ message: "Number must between 0 -  12" });
  }
});
