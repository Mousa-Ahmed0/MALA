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
    console.log(newPayment.value);
    console.log(newPayment.InsuranceCompPers / 100);//pers
    console.log(newPayment.value * (newPayment.InsuranceCompPers / 100));//discountedValue
    console.log(newPayment.value - (newPayment.value * (newPayment.InsuranceCompPers / 100)));//value

    if (newPayment.InsuranceCompPers) {
        const pers = newPayment.InsuranceCompPers / 100;
        newPayment.discountedValue = newPayment.value * pers;
        newPayment.value = newPayment.value - (newPayment.value * pers);
    }
    await newPayment.save();
    res.status(201).json({ newPayment, message: "done....." });
})