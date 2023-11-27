const asyncHandler = require("express-async-handler");
const { analyze, validateAnalyze } = require("../models/Analyze");

/**--------------------------------
 * @desc Add Analyze
 * @router /api/Add-Analyze
 * @method Post
 * @access private (only admin or staff)
 * ------------------------------------------ */
module.exports.addAnalyze = asyncHandler(async (req, res) => {
  const newAnalyze = new analyze({
    name: req.body.name,
    code: req.body.code,
    cost: req.body.cost,
    description: req.body.description,
    isAvailable: req.body.isAvailable,
    analyzeCategory: req.body.analyzeCategory,
    compnents: req.body.compnents,
  });

  //if anzlyze already exist
  const oldZ = await analyze.findOne({ code: newAnalyze.code });
  if (oldZ) return res.status(400).json({ message: "Analyze eixst" });

  //save analyze
  await newAnalyze.save();

  //send a response to cilnt
  res.status(200).json({ message: "Done.........." });
});

/**--------------------------------
 * @desc update Analyze
 * @router /api/Analyze/updateAnalyze
 * @method Post
 * @access private (only admin or staff)
 * ------------------------------------------ */
module.exports.updateAnalyze = asyncHandler(async (req, res) => {
  //vaildation front end
  const updateA = await analyze.findOneAndUpdate(
    { code: req.body.codeName },
    {
      $set: {
        name: req.body.name,
        code: req.body.code,
        cost: req.body.cost,
        description: req.body.description,
        isAvailable: req.body.isAvailable,
        analyzeCategory: req.body.analyzeCategory,
        compnents: req.body.compnents,
      },
    },
    { new: true }
  );

  //send a response to cilnt
  if (updateA) {
    res.status(200).json({ updateA, message: "Analyze is Updated" });
  } else {
    res.status(404).json({ message: "Analyze not found" });
  }
});

/**--------------------------------
 * @desc Get  all Analyzes
 * @router /api/analyze/getAnalyzes
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllAnalze = asyncHandler(async (req, res) => {
  const allAn = await analyze.find();
  if (!allAn) return res.status(404).json({ message: "Analyze not found" });
  res.status(200).json(allAn);
});
/**--------------------------------
 * @desc Get   Analyze
 * @router /api/analyze/getAnalyzesOne
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAnalze = asyncHandler(async (req, res) => {
  const oneAnalyze = await analyze.findOne({ code: req.params.code });
  if (!oneAnalyze)
    return res.status(404).json({ message: "Analyze not found" });
  res.status(200).json(oneAnalyze);
});

/**--------------------------------
 * @desc Update  User profile
 * @router /api/users/Ptofile/id
 * @method put
 * @access private (only user himself)
 * ------------------------------------------ */

// module.exports.updateUserProfile=asyncHandler(async (req,res)=>{
//     const {error} =validateUpdateUser(req.body);
//     if(error)
//         return res.status(400).json({message:error.details[0].message});

//     if(req.body.password){
//         const salt = await bcrypt.genSalt(8);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     const updatedUser=await user.findByIdAndUpdate(req.params.id,{
//         $set:{
//             username:req.body.username,
//             password:req.params.password,
//             bio:req.body.bio
//         }
//     },{new:true}).select("-password");
//     res.status(200).json(updatedUser);
// })

/**--------------------------------
 * @desc Get  Users Count
 * @router /api/users/count
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
// module.exports.getUsersCount=asyncHandler(async (req,res)=>{
//     const count=await user.count();
//     res.status(200).json(count);
// })
