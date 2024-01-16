// const  cloudinary=require("cloudinary");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.Cloudinary_CLOUD_NAME,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_API_SECRET
});
///cloudinary upload image
const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto",
        });

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}

///cloudinary Remove image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}

///cloudinary Remove multiple image
const cloudinaryRemoveMultipleImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}
const isValidCloudinaryPublicId = (publicId) => {
    try {
        // Define a regular expression pattern for Cloudinary public ID
        const cloudinaryPublicIdPattern = /^(?![ \/])(?!.*[ \/]$)(?!.*[?&#\%<>])[ -~]+$/;

        // Test the publicId against the pattern
        return cloudinaryPublicIdPattern.test(publicId);
    } catch (error) {
        // If an error occurs during parsing, consider it an invalid publicId
        return false;
    }
};

const doesPublicIdExist = async (publicId) => {
    try {
        // Use the cloudinary.api.resources method to retrieve a list of resources
        const result = await cloudinary.api.resources({
            type: 'upload', // Specify the resource type (e.g., 'upload' for images)
            public_id: publicId, // Specify the public ID you want to check
        });
        // console.log(publicId);
        // console.log(result);
        // If the result contains resources, the public ID exists
        return result.resources.length > 0;
    } catch (error) {
        // Handle specific Cloudinary error for "not found"
        if (error.http_code === 404 && error.error && error.error.message === 'Resource not found') {
            return false; // Public ID does not exist
        } else {
            // Handle other errors
            console.error('Error checking public ID existence:', error);
            throw error; // Re-throw the error for further handling
        }
    }
};

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage,
    isValidCloudinaryPublicId, doesPublicIdExist
}