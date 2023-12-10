const asyncHandler = require("express-async-handler");
const {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const { Advertisement } = require("../models/advertisements");

/**--------------------------------
 * @desc  new advertisements
 * @router /api/advertisements/addAdvert
 * @method post
 * @access public
 * ------------------------------------------ */
module.exports.advertisements = asyncHandler(async (req, res) => {

    let newAdver = new Advertisement({
        ident: req.body.ident,
        title: req.body.title,
        creDate: req.body.creDate,
        expDate:req.body.expDate,
        addText: req.body.addText,
    })

    await newAdver.save();
    res.status(201)
        .json({ message: "done........." });
})




/**--------------------------------
 * @desc   Profile photo upload
 * @router /api/advertisements/addPhoto
 * @method post
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.PhotoUpload = asyncHandler(async (req, res) => {
    let arrayImg = [];
    //1- validation
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No file provided" });

    // Assuming you want to process each uploaded image
    const uploadPromises = req.files.map(async (file) => {
        // Get the path to the image
        const imagePath = path.join(__dirname, `../images/${file.filename}`);

        // Upload to cloudinary
        const result = await cloudinaryUploadImage(imagePath);

        // Process the result as needed (e.g., store the cloudinary URL in a database)
        // ...
        let imageInfo = {
            url: result.secure_url,
            publicId: result.public_id,
        }
        arrayImg.push(imageInfo);
        console.log("1" + arrayImg);
        // You may also want to delete the local image file after uploading to cloudinary
        fs.unlinkSync(imagePath);
    });

    // Wait for all uploads to complete before responding
    Promise.all(uploadPromises)
        .then(async(results) => {
            // Handle results or send a response
            console.log("2" + arrayImg);
            const userN = await Advertisement.findOneAndUpdate({ ident: 1 }, {
                $set: {
                    advert: arrayImg,
                }
            }, { new: true });
            await userN.save();
            res.status(200).json({ message: "Images uploaded successfully", results });
        })
        .catch((error) => {
            console.error("Error uploading images:", error);
            res.status(500).json({ message: "Internal server error" });
        });


});