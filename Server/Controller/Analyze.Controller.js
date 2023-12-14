const asyncHandler = require("express-async-handler");
const { analyze, validateAnalyze } = require("../models/Analyze");

/**--------------------------------
 * @desc Add Analyze
 * @router /api/Add-Analyze
 * @method Post
 * @access private (only admin or staff)
 * ------------------------------------------ */
module.exports.addAnalyze = asyncHandler(async (req, res) => {
  //if anzlyze already exist
  const oldZ = await analyze.findOne({ code: req.body.code});
  if (oldZ) return res.status(400).json({ message: "Analyze eixst" });

  const newAnalyze = new analyze({
    name: req.body.name,
    code: req.body.code,
    cost: req.body.cost,
    description: req.body.description,
    isAvailable: req.body.isAvailable,
    analyzeCategory: req.body.analyzeCategory,
    compnents: req.body.compnents,
  });
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
    { code: req.body.code },
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
 * @desc Get  Analyze Count
 * @router /api/Analyze/count
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getAnalyzeCount = asyncHandler(async (req, res) => {
  const count = await analyze.count();
  res.status(200).json(count);
})

/**--------------------------------
 * @desc Get  Analyze Category
 * @router /api/Analyze/getCategorys
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getCategoryCount = asyncHandler(async (req, res) => {
  let arrayCat=[];
  const analyzeCategory = await analyze.find({}, { analyzeCategory: 1, _id: 0 });
  if (analyzeCategory){
    const uniqueCategories = new Set(analyzeCategory.map(item => item.analyzeCategory));
    arrayCat = [...uniqueCategories];
      res.status(200).json(arrayCat);
  }
  else
    res.status(400).json({message:"does not exist"},arrayCat);

})
