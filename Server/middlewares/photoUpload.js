const path = require("path");
const multer = require("multer");

//photo storage
const photoStorage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cd) {
        if (file)
            cd(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
        else
            cd(null, false);
    }
});
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function (req, file, cd) {
        if (file.mimetype.startsWith("image"))
            cd(null, true);
        else
            cd({ message: "Unsupported file format" }, false);
    },
    limits: { fileSize: 1024 * 1024 * 5 }
});
module.exports = photoUpload;