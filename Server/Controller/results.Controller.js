const asyncHandler = require("express-async-handler");
const { analyzeResult } = require("../models/patienResults");
const { user } = require("../models/user");
const { analyze } = require("../models/Analyze");
const {PythonShell}=require("python-shell");

/**--------------------------------
 * @desc add result
 * @router /api/result/addResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.addResults = asyncHandler(async (req, res) => {
  //vaildatin fronend
  const newResult = new analyzeResult({
    staffIdent: req.body.staffIdent,
    patientIdent: req.body.patientIdent,
    date: req.body.date,
    doctorIdent: req.body.doctorIdent,
    doctorName: req.body.doctorName,
    isDone: req.body.isDone,
    isPaied: req.body.isPaied,
    resultSet: req.body.resultSet,
  });
  await newResult.save();
  //send a response to client
  res.status(201).json({ newResult, message: "done..........." });
});
/**--------------------------------
 * @desc pyhton code
 * @router /api/result/getResults/pythonResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.pythonResults = asyncHandler(async (req, res) => {
  let options={
    args:["test","test2"],
    scriptPath:"D:/fullstck/final project/MALA/Server/utils/python",
  } 
  console.log("test")
  
  PythonShell.run("AnlayzeResultPredict.py",options).then(messages=>{
    // results is an array consisting of messages collected during execution
    messages.forEach((index)=>{
      console.log('results: %j', index); 
    })
  });
  res.status(201).json({  message: "done..........." });
});
/**--------------------------------
 * @desc edit result
 * @router /api/result/editResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.editResult = asyncHandler(async (req, res) => {
  //vaildatin fronend
  const editRes = await analyzeResult.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      isDone: req.body.isDone,
      resultSet: req.body.resultSet,
    },
    { new: true }
  );
  if (!editRes) {
    return res.status(404).json({ message: "Document not found" });
  }

  res.status(200).json({ editRes, message: "Update successful" });
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
    else {
      usersDoctor = detailsAnalyze[i].doctorName;
    }
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
  if(detailsAnalyze==null) res.status(400).json({message:"User not found"});
  console.log(detailsAnalyze);
  let analysArray = [];

  //analyze id componet
  const analyzePromises = detailsAnalyze.resultSet.map(async (result) => {
    const analyzeComp = await analyze
      .findById(result.anlyzeId)
      .sort({ createdAt: 1 }); // Adjust the field for sorting as needed
    return analyzeComp;
  });

  analysArray = await Promise.all(analyzePromises);
  // for (let i = 0; i < detailsAnalyze.resultSet.length; i++) {
  //   const analyzeComp = await analyze.findById(
  //     detailsAnalyze.resultSet[i].anlyzeId
  //   ).sort({ createdAt: 1 });
  //   analysArray.push(analyzeComp);
  // }
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
  else {
    usersDoctor = detailsAnalyze[i].doctorName;
  }

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
 * @desc get resuls by ID - and all analyze
 * @router /api/result/getAllResults/:id
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getAllResultsById = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.findById(req.params.id);
  if (detailsAnalyze) {
    let allId = []; //get all analyze id from req.params.id
    let analyzComponent = [];

    detailsAnalyze.resultSet.forEach(async (index) => {
      let analyzeComp = await analyze.findById(index.anlyzeId);
      analyzComponent.push(analyzeComp);
      allId.push(index.anlyzeId.toString());
    });

    console.log(allId);
    const patIdent = detailsAnalyze.patientIdent; //patientIdent form req.params.id

    const allResult = await analyzeResult.find({ patientIdent: patIdent });

    let userAnalyze = [];

    if (allResult.length) {
      //user patient
      const usersPatint = await user
        .findOne({ ident: detailsAnalyze.patientIdent })
        .select("firstname lastname sex birthday -_id ");

      //user staff
      const usersStaff = await user
        .findOne({ ident: detailsAnalyze.staffIdent })
        .select("firstname lastname -_id ");

      //user doctor
      let usersDoctor = null;
      if (detailsAnalyze.doctorIdent != "")
        usersDoctor = await user
          .findOne({ ident: detailsAnalyze.doctorIdent })
          .select("firstname lastname -_id");
      else {
        usersDoctor = detailsAnalyze.doctorName;
      }
      const resultDate = detailsAnalyze.date;
      const currentResult = detailsAnalyze;
      //loop on id
      allId.forEach(async (index) => {
        const analyzeId = index;

        allResult.forEach(async (ind) => {
          if (
            ind.id === detailsAnalyze.id ||
            new Date(ind.date) > new Date(detailsAnalyze.date)
          ) {
            return;
          } else {
            //for of resultSet to get result
            ind.resultSet.forEach(async (ele) => {
              //for of result to get anlyzeId
              if (ele.anlyzeId == analyzeId) {
                const userDetails = {
                  date: ind.date,
                  result: ele,
                };
                userAnalyze.push(userDetails);
              }
            });
          }
        });
      });
      //send a response to client
      res.status(201).json({
        analyzComponent,
        currentResult,
        resultDate,
        usersStaff,
        usersDoctor,
        usersPatint,
        userAnalyze,
        message: "done...........",
      });
    } else res.status(400).json({ message: "User not found" });
  } else res.status(400).json({ message: "ID not found" });
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
      else {
        usersDoctor = detailsAnalyze[i].doctorName;
      }
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
    isDone: true,
  });
  let usersArray = [];

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
      else {
        usersDoctor = detailsAnalyze[i].doctorName;
      }
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
    doctorIdent: req.query.doctorIdent,
    isDone: true,
  });
  let usersArray = [];
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
      else {
        usersDoctor = detailsAnalyze[i].doctorName;
      }
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
  } else {
    if (res.status(404)) res.status(404).json({ message: "User not found" });
    else if (res.status(403))
      res.status(404).json({ message: "No Results Found" });
  }
});
/**--------------------------------
 * @desc get resuls by ident of Staff
 * @router /api/result/getStaffAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsStaff = asyncHandler(async (req, res) => {
  const detailsAnalyze = await analyzeResult.find({
    staffIdent: req.query.staffIdent,
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
 * @desc get week month of result
 * @router /api/getResults/resultDate
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.resultDate = asyncHandler(async (req, res) => {
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
  const number = req.query.number;
  const currentDate = new Date(req.query.date);
  const startDate = new Date(currentDate);

  let responseSent = false; // Variable to track whether response has been sent

  if (number == 0) {
    //week
    startDate.setDate(currentDate.getDate() - 7);
    const getAllResult = await analyzeResult.find({
      date: { $gte: startDate, $lte: currentDate },
    });
    let resultArray = [];

    if (getAllResult.length) {
      for (let i = 0; i < getAllResult.length; i++) {
        const userinfo = await user
          .findOne({
            ident: getAllResult[i].patientIdent,
          })
          .select("-password");
        const dayOfWeek = getAllResult[i].date.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day

        const pymentDetails = {
          day: dayName,
          date: getAllResult[i].date,
          Result: getAllResult[i],
          info: userinfo,
        };
        resultArray.push(pymentDetails);
      }

      if (!responseSent) {
        res.status(201).json({
          resultArray,
          message: "Reports generated successfully.",
        });
        responseSent = true; // Set the flag to true to indicate response has been sent
      }
    } else {
      // Send the response if there are no results
      if (!responseSent) {
        res.status(400).json({ message: "Can't find report" });
        responseSent = true; // Set the flag to true to indicate response has been sent
      }
    }
  } else if (number >= 1 && number <= 12) {
    //number of month
    startDate.setMonth(currentDate.getMonth() - number);
    const getAllResult = await analyzeResult.find({
      date: { $gte: startDate, $lte: currentDate },
    });

    let resultArray = [];

    if (getAllResult.length) {
      for (let i = 0; i < getAllResult.length; i++) {
        const userinfo = await user
          .findOne({
            ident: getAllResult[i].patientIdent,
          })
          .select("-password");
        const dayOfWeek = getAllResult[i].date.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day

        const pymentDetails = {
          day: dayName,
          date: getAllResult[i].date,
          Result: getAllResult[i],
          info: userinfo,
        };
        resultArray.push(pymentDetails);
      }
      if (!responseSent) {
        res.status(201).json({
          resultArray,
          message: "Reports generated successfully.",
        });
        responseSent = true; // Set the flag to true to indicate response has been sent
      }
    } else {
      // Send the response if there are no results
      if (!responseSent) {
        res.status(400).json({ message: "Can't find report" });
        responseSent = true; // Set the flag to true to indicate response has been sent
      }
    }
  }
  // Send a default response if none of the conditions are met
  if (!responseSent) {
    res.status(400).json({ message: "Number must between 0-12" });
    responseSent = true; // Set the flag to true to indicate response has been sent
  }
});

/**--------------------------------
 * @desc get from to date of result
 * @router /api/getResults/resultDateFromTo
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.resultDateFromTo = asyncHandler(async (req, res) => {
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

  const getAllResult = await analyzeResult.find({
    date: { $gte: firstDate, $lte: secondtDate },
  });

  let resultArray = [];
  if (getAllResult.length) {
    for (let i = 0; i < getAllResult.length; i++) {
      const userinfo = await user
        .findOne({
          ident: getAllResult[i].patientIdent,
        })
        .select("-password");
      const dayOfWeek = getAllResult[i].date.getDay(); //find day
      const dayName = daysOfWeek[dayOfWeek]; //find name of day

      const pymentDetails = {
        day: dayName,
        date: getAllResult[i].date,
        Result: getAllResult[i],
        info: userinfo,
      };
      resultArray.push(pymentDetails);
    }
    res.status(201).json({
      resultArray,
      message: "Reports generated successfully.",
    });
  } else {
    res.status(400).json({ message: "Can't find report" });
  }
});

/**--------------------------------
 * @desc get by one day result
 * @router /api/getResults/dayResult
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.dayResult = asyncHandler(async (req, res) => {
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
  console.log(req.query.date);
  const getAllResult = await analyzeResult.find({
    date: req.query.date,
  });

  let resultArray = [];
  if (getAllResult.length) {
    for (let i = 0; i < getAllResult.length; i++) {
      const userinfo = await user
        .findOne({
          ident: getAllResult[i].patientIdent,
        })
        .select("-password");
      const dayOfWeek = getAllResult[i].date.getDay(); //find day
      const dayName = daysOfWeek[dayOfWeek]; //find name of day
      const pymentDetails = {
        day: dayName,
        date: getAllResult[i].date,
        Result: getAllResult[i],
        info: userinfo,
      };
      resultArray.push(pymentDetails);
    }
    res.status(201).json({
      resultArray,
      message: "Reports generated successfully.",
    });
  } else {
    res.status(400).json({ message: "Can't find report" });
  }
});

/**--------------------------------
 * @desc if result done
 * @router /api/Results/ifDone
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDone = asyncHandler(async (req, res) => {
  const isDone = await analyzeResult.find({ isDone: req.query.isDone });
  let usersArray = [];

  if (isDone.length) {
    for (let i = 0; i < isDone.length; i++) {
      //user staff
      const usersStaff = await user
        .findOne({ ident: isDone[i].staffIdent })
        .select("firstname lastname -_id ");

      //user patient
      const usersPatint = await user
        .findOne({ ident: isDone[i].patientIdent })
        .select("firstname lastname sex birthday -_id ");
      //user doctor
      let usersDoctor = null;
      if (isDone[i].doctorIdent != "")
        usersDoctor = await user
          .findOne({ ident: isDone[i].doctorIdent })
          .select("firstname lastname -_id");
      else {
        usersDoctor = isDone[i].doctorName;
      }
      // Create an object with the required properties
      const userDetails = {
        isDone: isDone[i],
        usersPatient: usersPatint,
        usersStaff: usersStaff,
        usersDoctor: usersDoctor,
      };
      // Push the object to the array
      usersArray.push(userDetails);
    }
    res.status(200).json({ usersArray });
  }

  if (isDone.length) res.status(200).json({ isDone });
  else res.status(404).json({ message: "Not repot " });
});
/**--------------------------------
 * @desc count result done or not dont
 * @router /api/Results/ifDoneCount
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDoneCount = asyncHandler(async (req, res) => {
  const isDoneTrue = await analyzeResult.find({ isDone: true }).count();
  const isDoneFalse = await analyzeResult.find({ isDone: false }).count();

  if (isDoneTrue || isDoneFalse) {
    res
      .status(200)
      .json({ Number_of_true: isDoneTrue, Number_of_false: isDoneFalse });
  } else res.status(404).json({ message: "Not repot " });
});
/**--------------------------------
 * @desc count result done or not dont
 * @router /api/Results/ifDoneCount
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isPaiedCount = asyncHandler(async (req, res) => {
  const isPaiedTrue = await analyzeResult.find({ isPaied: true }).count();
  const isPaiedFalse = await analyzeResult.find({ isPaied: false }).count();

  if (isPaiedTrue || isPaiedFalse) {
    res
      .status(200)
      .json({ Number_of_true: isPaiedTrue, Number_of_false: isPaiedFalse });
  } else res.status(404).json({ message: "Not repot " });
});
/**--------------------------------
 * @desc if result done edit to true
 * @router /api/Results/Results/ifDoneEdit
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDoneEdit = asyncHandler(async (req, res) => {
  const ifDone = await analyzeResult.findById(req.params.id);
  if (ifDone) {
    if (ifDone.isDone) res.status(200).json({ message: "Alrede True", ifDone });
    else {
      ifDone.isDone = true;
      await ifDone.save();
      res.status(200).json({ message: "done edit...", ifDone });
    }
  } else res.status(404).json({ message: "Does not exist " });
});

/**--------------------------------
 * @desc if result paied
 * @router /api/Results/ifPaied
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isPaied = asyncHandler(async (req, res) => {
  /* const isPaied = await analyzeResult.find({ isPaied: req.query.isPaied });

  if (isPaied.length)
    res.status(200).json({ "Number of  paied": isPaied.length, isPaied });
  else res.status(404).json({ message: "Not repot " });*/
  const isPaied = await analyzeResult.find({ isPaied: req.query.isPaied });
  let usersArray = [];

  if (isPaied.length) {
    for (let i = 0; i < isPaied.length; i++) {
      //user staff
      const usersStaff = await user
        .findOne({ ident: isPaied[i].staffIdent })
        .select("firstname lastname -_id ");

      //user patient
      const usersPatint = await user
        .findOne({ ident: isPaied[i].patientIdent })
        .select("firstname lastname sex birthday -_id ");
      //user doctor
      let usersDoctor = null;
      if (isPaied[i].doctorIdent != "")
        usersDoctor = await user
          .findOne({ ident: isPaied[i].doctorIdent })
          .select("firstname lastname -_id");
      else {
        usersDoctor = isPaied[i].doctorName;
      }
      // Create an object with the required properties
      const userDetails = {
        isPaied: isPaied[i],
        usersPatient: usersPatint,
        usersStaff: usersStaff,
        usersDoctor: usersDoctor,
      };
      // Push the object to the array
      usersArray.push(userDetails);
    }
    res.status(200).json({ usersArray });
  } else res.status(404).json({ message: "Not repot " });
});

/**--------------------------------
 * @desc if result paied edit to true
 * @router /api/Results/Results/ifPaiedEdit
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isPaiedEdit = asyncHandler(async (req, res) => {
  const ifPaied = await analyzeResult.findById(req.params.id);
  if (ifPaied) {
    if (ifPaied.isPaied)
      res.status(200).json({ message: "Alrede True", ifPaied });
    else {
      ifPaied.isPaied = true;
      await ifPaied.save();
      res.status(200).json({ message: "done edit...", ifPaied });
    }
  } else res.status(404).json({ message: "Does not exist " });
});
