const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const {
  Advertisement,
  vaildationAdvertisement,
} = require("../models/advertisements");

/**--------------------------------
 * @desc     upload advertisements
 * @router /api/advertisements/addAdvert
 * @method POST
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.addAdvert = asyncHandler(async (req, res) => {
  try {
    //chack validation
    const { error } = vaildationAdvertisement(req.body);
    if (error) {
      let mesError = [];
      error.details.map((index) => {
        mesError.push(index.message);
      });
      return res.status(400).json({ message: mesError });
    }
    let newadv = await Advertisement.findOne({ title: req.body.title });
    if (newadv) {
      return res.status(400).json({ message: "Advertisement already exist" });
    }

    let arrayImg = [];
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No file provided" });

    // Assuming you want to process each uploaded image
    const uploadPromises = req.files.map(async (file) => {
      console.log("uploadPromises");
      // Get the path to the image
      const imagePath = path.join(__dirname, `../images/${file.filename}`);

      // Upload to cloudinary
      const result = await cloudinaryUploadImage(imagePath);
      //Delete local image file after uploading to cloudinary
      fs.unlinkSync(imagePath);

      let imageInfo = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      arrayImg.push(imageInfo);
    });

    // Wait for all uploads to complete before responding
    Promise.all(uploadPromises)
      .then(async () => {
        let newAdver = new Advertisement({
          title: req.body.title,
          creDate: req.body.creDate,
          expDate: req.body.expDate,
          addText: req.body.addText,
          advert: arrayImg,
        });

        await newAdver.save();
        res
          .status(200)
          .json({ message: "Images uploaded successfully", newAdver });
      })
      .catch((error) => {
        if (res.data.message === "Unexpected field") {
          res.status(400).json({ message: "Unexpected" });
        }
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.log(error);
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc   get all advertisements
 * @router /api/advertisements/getAdvertis
 * @method GET
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.getAdvert = asyncHandler(async (req, res) => {
  try {
    let allAdv = await Advertisement.find({});
    if (allAdv) res.status(201).json({ message: "done.........", allAdv });
    else return res.status(400).json({ message: "dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc   get  advertisements by pages
 * @router /api/advertisements/getAdvertisPages
 * @method GET
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.getAdvertisPages = asyncHandler(async (req, res) => {
  try {
    const POST_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;
    let allAdv = await Advertisement.find({})
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE);
    if (allAdv) res.status(201).json({ message: "done.........", allAdv });
    else return res.status(400).json({ message: "dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc   get  advertisements by _id
 * @router /api/advertisements/getAdvertisTd/:id
 * @method GET
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.getAdvertId = asyncHandler(async (req, res) => {
  try {
    let allAdv = await Advertisement.findById(req.params.id);
    if (allAdv) res.status(201).json({ message: "done.........", allAdv });
    else return res.status(400).json({ message: "dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc     update advertisements
 * @router /api/advertisements/updateAdverti
 * @method PUT
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.updateAdverti = asyncHandler(async (req, res) => {
  try {
    let test = await Advertisement.findById(req.params.id);

    //if Advertisement exsit
    if (!test)
      return res.status(404).json({ message: "Advertisement not found" });

    let arrayImg = [];
    let oldImag = test.advert;

    //save text
    test.title = req.body.title;
    test.addText = req.body.addText;
    test.creDate = req.body.creDate;
    test.expDate = req.body.expDate;
    //edit image
    if (req.files || req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const imagePath = path.join(__dirname, `../images/${file.filename}`);
        const result = await cloudinaryUploadImage(imagePath);
        fs.unlinkSync(imagePath);

        let imageInfo = {
          url: result.secure_url,
          publicId: result.public_id,
        };
        arrayImg.push(imageInfo);
      });  

       
      //delete old image
      for (let i = 0; i < oldImag.length; i++) {
        await cloudinaryRemoveImage(oldImag[i].publicId);
      }
      // Wait for all uploads to complete before saving the updated advertisement
      await Promise.all(uploadPromises);
    }
    test.advert = arrayImg;

    //save to database
    await test.save();

    res
      .status(200)
      .json({ message: "Advertisement updated successfully", test });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc     delete advertisements
 * @router /api/advertisements/deleteAdvert
 * @method DELETE
 * @access private (only logged in admin)
 * ------------------------------------------ */
module.exports.deleteAdvert = asyncHandler(async (req, res) => {
  try {
    let del = await Advertisement.findById(req.params.id);

    //if Advertisement exsit
    if (!del)
      return res.status(404).json({ message: "Advertisement not found" });

    let oldImag = del.advert;

    //delete image from cloudinary
    for (let i = 0; i < oldImag.length; i++) {
      await cloudinaryRemoveImage(oldImag[i].publicId);
    }

    //delete from db
    await del.deleteOne();
    return res.status(200).json({ message: "Advertisement is delete..." });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMass: "Internal Server Error", error });
  }
});
