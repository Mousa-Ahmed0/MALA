const asyncHandler = require("express-async-handler");
const { analyzeResult, vaildationResults } = require("../models/patienResults");
const { user } = require("../models/user");
const { analyze } = require("../models/Analyze");
const { PythonShell } = require("python-shell");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  isValidCloudinaryPublicId,
  doesPublicIdExist,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
/**--------------------------------
 * @desc add result
 * @router /api/result/addResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.addResults = asyncHandler(async (req, res) => {
  //vaildatin fronend
  try {
    const { error } = vaildationResults(req.body);
    // validation
    if (error) {
      let mesError = [];
      error.details.map((index) => {
        mesError.push(index.message);
      });
      return res.status(400).json({ message: mesError });
    }
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
function calAge(birthday) {
  const birthdate = new Date(birthday);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate - birthdate;

  // Calculate the age
  const ageInMilliseconds = new Date(timeDiff);
  const years = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
  return years;
}
/**--------------------------------
 * @desc pyhton code
 * @router /api/result/getResults/pythonResults
 * @method post
 * @access  (Doctor)
 * ------------------------------------------ */
module.exports.pythonResults = asyncHandler(async (req, res) => {
  try {
    const detailsAnalyze = await analyzeResult.findById(req.params.id);
    if (detailsAnalyze) {
      let result = [];

      for (const index of detailsAnalyze.resultSet) {
        let analyzeComp = await analyze.findById(index.anlyzeId);
        if (analyzeComp.code.toUpperCase() === "CBC") {
          result = [...index.result];

          break; // Exit the loop if the condition is met
        }
      }
      //user staff
      const usersStaff = await user
        .findOne({ ident: detailsAnalyze.patientIdent })
        .select("-password -_id ");
      // console.log(result);
      const years = calAge(usersStaff.birthday);
      const sex = usersStaff.sex === "Male" ? 1 : 0;
      // console.log(result);

      // componentResults for Python
      let componentResults = [
        { name: "RBC", value: 0 },
        { name: "PCV", value: 0 },
        { name: "MCV", value: 0 },
        { name: "MCH", value: 0 },
        { name: "MCHC", value: 0 },
        { name: "RDW", value: 0 },
        { name: "TLC", value: 0 },
        { name: "PLT /mm3", value: 0 },
        { name: "HGB", value: 0 },
      ];
      result.map((r) => {
        componentResults.map((compResult) => {
          if (compResult.name === r.name) {
            compResult.value = r.value;
          }
        });
      });
      let results = [];
      for (const comp of componentResults) {
        results.push(comp.value);
      }
      let options = {
        args: [years, sex, results],
        scriptPath: "../Server/utils/python",
      };
      PythonShell.run("AnlayzeResultPredict.py", options).then(
        async (result) => {
          // results is an array consisting of result collected during execution

          res.status(200).json({ messag: "done...........", result });
        }
      );
    } else res.status(404).json({ message: "User not found" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc delet image resutl
 * @router /api/result/imageResutl
 * @method POST
 * @access  (Doctor)
 * ------------------------------------------ */
module.exports.imageDeletResutl = asyncHandler(async (req, res) => {
  try {
    const publicId = req.body.publicId.toString();

    // Check if the Cloudinary public ID exists
    const exists = await doesPublicIdExist(publicId);
    console.log(exists);
    // console.log(isValidCloudinaryPublicId(publicId))
    // Validate the Cloudinary public ID
    if (publicId) {
      console.log(publicId);

      await cloudinaryRemoveImage(publicId);

      res.status(200).json({ message: "Delete images" });
    } else res.status(400).json({ message: "publicId Not found" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc edit result
 * @router /api/result/editResults
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.editResult = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get resuls
 * @router /api/result/getResults
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResults = asyncHandler(async (req, res) => {
  try {
    const POST_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;
    const detailsAnalyze = await analyzeResult
      .find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE);
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc get resuls by ID
 * @router /api/result/getResults/:id
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsById = asyncHandler(async (req, res) => {
  try {
    const detailsAnalyze = await analyzeResult.findById(req.params.id);
    if (detailsAnalyze == null)
      res.status(400).json({ message: "Result not found" });
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
      usersDoctor = detailsAnalyze.doctorName;
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get resuls by ID - and all analyze
 * @router /api/result/getAllResults/:id
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getAllResultsById = asyncHandler(async (req, res) => {
  try {
    const detailsAnalyze = await analyzeResult.findById(req.params.id);
    if (detailsAnalyze) {
      let allId = []; //get all analyze id from req.params.id
      let analyzComponent = [];
      for (const index of detailsAnalyze.resultSet) {
        let analyzeComp = await analyze.findById(index.anlyzeId);
        analyzComponent.push(analyzeComp);
        allId.push(index.anlyzeId.toString());
      }

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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get resuls by staffIdent
 * @router /api/result/getResults/staffIdent
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsByIdStaff = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get resuls by ident of patient
 * @router /api/result/getPatientAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsPatient = asyncHandler(async (req, res) => {
  try {
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
    } else res.status(400).json({ message: "User not found" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get resuls by ident of doctor
 * @router /api/result/getDoctorAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsDoctor = asyncHandler(async (req, res) => {
  try {
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
          .select("firstname lastname sex birthday _id ");
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc get resuls by ident of Staff
 * @router /api/result/getStaffAnzlyze
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.getResultsStaff = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc get week month of result
 * @router /api/getResults/resultDate
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.resultDate = asyncHandler(async (req, res) => {
  //vaildition @front end
  try {
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
      const USER_PER_PAGE = 10;
      const pageNumber = req.query.pageNumber;

      const getAllResult = await analyzeResult
        .find({
          date: { $gte: startDate, $lte: currentDate },
        })
        .skip((pageNumber - 1) * USER_PER_PAGE)
        .limit(USER_PER_PAGE);
      let resultArray = [];

      if (getAllResult.length) {
        const count = await analyzeResult
          .find({
            date: { $gte: startDate, $lte: currentDate },
          })
          .count();
        for (let i = 0; i < getAllResult.length; i++) {
          //
          const userinfo = await user
            .findOne({
              ident: getAllResult[i].patientIdent,
            })
            .select("-password");
          //
          const usersStaff = await user
            .findOne({
              ident: getAllResult[i].staffIdent,
            })
            .select("-password");
          //
          const usersDoctor = await user
            .findOne({
              ident: getAllResult[i].doctorIdent,
            })
            .select("-password");
          const dayOfWeek = getAllResult[i].date.getDay(); //find day
          const dayName = daysOfWeek[dayOfWeek]; //find name of day

          const pymentDetails = {
            day: dayName,
            date: getAllResult[i].date,
            isDone: getAllResult[i],
            usersPatient: userinfo,
            usersStaff,
            usersDoctor,
          };
          resultArray.push(pymentDetails);
        }

        if (!responseSent) {
          res.status(201).json({
            count,
            usersArray: resultArray,
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
      const USER_PER_PAGE = 10;
      const pageNumber = req.query.pageNumber;

      const getAllResult = await analyzeResult
        .find({
          date: { $gte: startDate, $lte: currentDate },
        })
        .skip((pageNumber - 1) * USER_PER_PAGE)
        .limit(USER_PER_PAGE);

      let resultArray = [];

      if (getAllResult.length) {
        const count = await analyzeResult
          .find({
            date: { $gte: startDate, $lte: currentDate },
          })
          .count();

        for (let i = 0; i < getAllResult.length; i++) {
          const userinfo = await user
            .findOne({
              ident: getAllResult[i].patientIdent,
            })
            .select("-password");
          //
          const usersStaff = await user
            .findOne({
              ident: getAllResult[i].staffIdent,
            })
            .select("-password");
          //
          const usersDoctor = await user
            .findOne({
              ident: getAllResult[i].doctorIdent,
            })
            .select("-password");
          const dayOfWeek = getAllResult[i].date.getDay(); //find day
          const dayName = daysOfWeek[dayOfWeek]; //find name of day

          const pymentDetails = {
            day: dayName,
            date: getAllResult[i].date,
            isDone: getAllResult[i],
            usersPatient: userinfo,
            usersStaff,
            usersDoctor,
          };
          resultArray.push(pymentDetails);
        }
        if (!responseSent) {
          res.status(201).json({
            count,
            usersArray: resultArray,
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc get from to date of result
 * @router /api/getResults/resultDateFromTo
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.resultDateFromTo = asyncHandler(async (req, res) => {
  try {
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
    const USER_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;

    const getAllResult = await analyzeResult
      .find({
        date: { $gte: firstDate, $lte: secondtDate },
      })
      .skip((pageNumber - 1) * USER_PER_PAGE)
      .limit(USER_PER_PAGE);

    let resultArray = [];
    if (getAllResult.length) {
      const count = await analyzeResult
        .find({
          date: { $gte: firstDate, $lte: secondtDate },
        })
        .count();
      for (let i = 0; i < getAllResult.length; i++) {
        const userinfo = await user
          .findOne({
            ident: getAllResult[i].patientIdent,
          })
          .select("-password");
        //
        const usersStaff = await user
          .findOne({
            ident: getAllResult[i].staffIdent,
          })
          .select("-password");
        //
        const usersDoctor = await user
          .findOne({
            ident: getAllResult[i].doctorIdent,
          })
          .select("-password");
        const dayOfWeek = getAllResult[i].date.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day

        const pymentDetails = {
          day: dayName,
          date: getAllResult[i].date,
          isDone: getAllResult[i],
          usersPatient: userinfo,
          usersStaff,
          usersDoctor,
        };
        resultArray.push(pymentDetails);
      }
      res.status(201).json({
        count,
        usersArray: resultArray,
        message: "Reports generated successfully.",
      });
    } else {
      res.status(400).json({ message: "Can't find report" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
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
  try {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const USER_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;

    const getAllResult = await analyzeResult
      .find({
        date: req.query.date,
      })
      .skip((pageNumber - 1) * USER_PER_PAGE)
      .limit(USER_PER_PAGE);

    let resultArray = [];
    if (getAllResult.length) {
      const count = await analyzeResult.find({}).count();
      for (let i = 0; i < getAllResult.length; i++) {
        const userinfo = await user
          .findOne({
            ident: getAllResult[i].patientIdent,
          })
          .select("-password");
        //
        const usersStaff = await user
          .findOne({
            ident: getAllResult[i].staffIdent,
          })
          .select("-password");
        //
        const usersDoctor = await user
          .findOne({
            ident: getAllResult[i].doctorIdent,
          })
          .select("-password");
        const dayOfWeek = getAllResult[i].date.getDay(); //find day
        const dayName = daysOfWeek[dayOfWeek]; //find name of day
        const pymentDetails = {
          day: dayName,
          date: getAllResult[i].date,
          Result: getAllResult[i],
          usersPatient: userinfo,
          usersStaff,
          usersDoctor,
        };
        resultArray.push(pymentDetails);
      }
      res.status(201).json({
        count,
        resultArray,
        message: "Reports generated successfully.",
      });
    } else {
      res.status(400).json({ message: "Can't find report" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc if result done
 * @router /api/Results/ifDone
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDone = asyncHandler(async (req, res) => {
  try {
    const USER_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;
    const isDone = await analyzeResult
      .find({ isDone: req.query.isDone })
      .skip((pageNumber - 1) * USER_PER_PAGE)
      .limit(USER_PER_PAGE)
      .sort({ createdAt: -1 });
    let usersArray = [];

    if (isDone.length) {
      const count = await analyzeResult.find({}).count();

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
      //
      res.status(200).json({ count, usersArray });
    } else res.status(404).json({ message: "Not repot " });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc count result done or not dont
 * @router /api/Results/ifDoneCount
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDoneCount = asyncHandler(async (req, res) => {
  try {
    const isDoneTrue = await analyzeResult.find({ isDone: true }).count();
    const isDoneFalse = await analyzeResult.find({ isDone: false }).count();

    if (isDoneTrue || isDoneFalse) {
      res
        .status(200)
        .json({ Number_of_true: isDoneTrue, Number_of_false: isDoneFalse });
    } else res.status(404).json({ message: "Not repot " });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc count result done or not dont
 * @router /api/Results/ifDoneCount
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isPaiedCount = asyncHandler(async (req, res) => {
  try {
    const isPaiedTrue = await analyzeResult.find({ isPaied: true }).count();
    const isPaiedFalse = await analyzeResult.find({ isPaied: false }).count();

    if (isPaiedTrue || isPaiedFalse) {
      res
        .status(200)
        .json({ Number_of_true: isPaiedTrue, Number_of_false: isPaiedFalse });
    } else res.status(404).json({ message: "Not repot " });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc if result done edit to true
 * @router /api/Results/Results/ifDoneEdit
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isDoneEdit = asyncHandler(async (req, res) => {
  try {
    const ifDone = await analyzeResult.findById(req.params.id);
    if (ifDone) {
      if (ifDone.isDone)
        res.status(200).json({ message: "Alrede True", ifDone });
      else {
        ifDone.isDone = true;
        await ifDone.save();
        res.status(200).json({ message: "done edit...", ifDone });
      }
    } else res.status(404).json({ message: "Does not exist " });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
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
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc if result paied edit to true
 * @router /api/Results/Results/ifPaiedEdit
 * @method GET
 * @access private (staff or admin)
 * ------------------------------------------ */
module.exports.isPaiedEdit = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
