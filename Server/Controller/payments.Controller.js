const asyncHandler = require("express-async-handler");
const { payments } = require("../models/payments");
const { models } = require("mongoose");

/**-----------------------------------
 * @desc add payments 
 * @router /api/payment/addPayment
 * @method POST
 * @access private (staff or admin ) 
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
    if (newPayment.InsuranceCompPers) {
        const pers = newPayment.InsuranceCompPers / 100;//pers
        newPayment.discountedValue = newPayment.value * pers;//discountedValue
        newPayment.value = newPayment.value - (newPayment.value * pers);//value
    }
    await newPayment.save();
    res.status(201).json({ newPayment, message: "done....." });
});
/**-----------------------------------
 * @desc get all  payments 
 * @router /api/payment/getPayment
 * @method GET 
 * @access private (staff or admin ) 
 * -----------------------------------*/
module.exports.getPayment = asyncHandler(async (req, res) => { 
    //vaildition @front end 
    // const getAllPayment = await payments.find().select("value -_id ");
    const getAllPayment = await payments.find();
    if (getAllPayment){
        let count=0;
        for(let i=0;i<getAllPayment.length;i++){
            count+=getAllPayment[i].value;
        }
        res.status(201).json({ count,getAllPayment, message: "done....." });
    }
    else
        res.status(400).json({message:"Can't find repoet"});
});


/**-----------------------------------
 * @desc get count payments 
 * @router /api/payment/countPayment
 * @method GET 
 * @access private (staff or admin ) 
 * -----------------------------------*/
module.exports.countPayment = asyncHandler(async (req, res) => { 
    //vaildition @front end 
    const count = await payments.count();
    if (count)
        res.status(201).json({ count, message: "done....." });
    else
        res.status(400).json({message:"Can't find repoet"});
});

/**-----------------------------------
 * @desc get payments  by identPatient
 * @router /api/payment/getPaymentIdentPatient
 * @method GET 
 * @access private (staff or admin ) 
 * -----------------------------------*/
module.exports.getPaymentIdentPatient = asyncHandler(async (req, res) => { 
    //vaildition @front end 
    const getPayment = await payments.find({identPatient:req.body.identPatient});
    if (getPayment){
        let count=0;
        for(let i=0;i<getPayment.length;i++){
            count+=getPayment[i].value;
        }
        res.status(201).json({count, getPayment, message: "done....." });
    }
    else
        res.status(400).json({message:"Can't find repoet"});
});