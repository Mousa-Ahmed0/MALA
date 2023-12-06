const asyncHandler = require("express-async-handler");
const { analyzeResult } = require("../models/patienResults");
const { user } = require("../models/user");
const { analyze } = require("../models/Analyze");
/**--------------------------------
 * @desc add result
 * @router /api/result/addResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.addResults = asyncHandler(async (req, res) => {
  // validation  @frontend

  const newResult = new analyzeResult({
    staffIdent: req.body.staffIdent,
    patientIdent: req.body.patientIdent,
    doctorIdent: req.body.doctorIdent,
    doctorName: req.body.doctorName,
    date: req.body.date,
    resultSet: req.body.resultSet,
  });
  await newResult.save();
  //send a response to client d
  res.status(201).json({ newResult, message: "done..........." });
});

/**--------------------------------
 * @desc get resuls
 * @router /api/result/getResults
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResults = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.find();
  let usersArray = [];
  // let usersPatint = null;
  // let usersDoctor = null;
  for (let i = 0; i < detailsAnalyze.length; i++) {
    //user staff
    const usersStaff = await user
      .findOne({ ident: detailsAnalyze[i].staffIdent })
      .select("firstname lastname -_id ");

    //user patient
    const usersPatint = await user
      .findOne({ ident: detailsAnalyze[i].patientIdent })
      .select("firstname lastname sex birthday -_id ");
    //user doctor
    let usersDoctor = null;
    if (detailsAnalyze[i].doctorIdent != "")
      usersDoctor = await user
        .findOne({ ident: detailsAnalyze[i].doctorIdent })
        .select("firstname lastname -_id");
    // Create an object with the required properties
    const userDetails = {
      detailsAnalyze: detailsAnalyze[i],
      usersPatient: usersPatint,
      usersStaff: usersStaff,
      usersDoctor: usersDoctor,
    };
    // Push the object to the array
    usersArray.push(userDetails);
  }
  //send a response to client
  res.status(201).json({
    usersArray,
    message: "done...........",
  });
});
/**--------------------------------
 * @desc get resuls by ID
 * @router /api/result/getResults/:id
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsById = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.findById(req.params.id);
  let analysArray = [];

  //analyze id componet
  for (let i = 0; i < detailsAnalyze.resultSet.length; i++) {
    const analyzeComp = await analyze.findById(
      detailsAnalyze.resultSet[i].anlyzeId
    );
    analysArray.push(analyzeComp);
  }
  //user staff
  const usersStaff = await user
    .findOne({ ident: detailsAnalyze.staffIdent })
    .select("firstname lastname -_id ");

  //user patient
  const usersPatint = await user
    .findOne({ ident: detailsAnalyze.patientIdent })
    .select("firstname lastname sex birthday -_id ");
  //user doctor
  let usersDoctor = null;
  if (detailsAnalyze.doctorIdent != "")
    usersDoctor = await user
      .findOne({ ident: detailsAnalyze.doctorIdent })
      .select("firstname lastname -_id");

  if (detailsAnalyze.doctorIdent != "")
    usersDoctor = await user
      .findOne({ ident: detailsAnalyze.doctorIdent })
      .select("firstname lastname -_id");

  //send a response to client
  res.status(201).json({
    analysArray,
    detailsAnalyze,
    usersStaff,
    usersDoctor,
    usersPatint,
    message: "done...........",
  });
});

/**--------------------------------
 * @desc get resuls by staffIdent
 * @router /api/result/getResults/staffIdent
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsByIdStaff = asyncHandler(async (req, res) => {
  let analysArray = [];

  const detailsAnalyze = await analyzeResult.find({
    staffIdent: req.query.staffIdent,
  });
  if (detailsAnalyze.length) {
    for (let i = 0; i < detailsAnalyze.length; i++) {
      //user staff
      const usersStaff = await user
        .findOne({ ident: detailsAnalyze[i].staffIdent })
        .select("firstname lastname -_id ");

      //user patient
      const usersPatint = await user
        .findOne({ ident: detailsAnalyze[i].patientIdent })
        .select("firstname lastname sex birthday -_id ");
      //user doctor
      let usersDoctor = null;
      if (detailsAnalyze[i].doctorIdent != "")
        usersDoctor = await user
          .findOne({ ident: detailsAnalyze[i].doctorIdent })
          .select("firstname lastname -_id");
      // Create an object with the required properties
      const userDetails = {
        detailsAnalyze: detailsAnalyze[i],
        usersPatient: usersPatint,
        usersStaff: usersStaff,
        usersDoctor: usersDoctor,
      };
      // Push the object to the array
      analysArray.push(userDetails);
    }
  }


  //send a response to client
  res.status(201).json({
    analysArray,
    message: "done...........",
  });
});

/**--------------------------------
 * @desc get resuls by ident of patient
 * @router /api/result/getPatientAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsPatient = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.find({
    patientIdent: req.query.patientIdent,
  });
  if (detailsAnalyze != "") {
    //send a response to client
    res.status(201).json({
      detailsAnalyze,
      message: "done...........",
    });
  } else res.status(404).json({ message: "User not found" });
});

/**--------------------------------
 * @desc get resuls by ident of doctor
 * @router /api/result/getDoctorAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsDoctor = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.find({
    doctorIdent: req.body.doctorIdent,
  });
  if (detailsAnalyze != "") {
    //send a response to client
    res.status(201).json({
      detailsAnalyze,
      message: "done...........",
    });
  } else res.status(404).json({ message: "User not found" });
});
/**--------------------------------
 * @desc get resuls by ident of Staff
 * @router /api/result/getStaffAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsStaff = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.find({
    staffIdent: req.body.staffIdent,
  });
  if (detailsAnalyze != "") {
    //send a response to client
    res.status(201).json({
      detailsAnalyze,
      message: "done...........",
    });
  } else res.status(404).json({ message: "User not found" });
});
