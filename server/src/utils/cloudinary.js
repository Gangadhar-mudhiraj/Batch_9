import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: "dzjfzbzyt",
    api_key: 459794515323733,
    api_secret: "zQGxMOHYE3w0E9aNCS83jkek5u8"
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log(process.env.CLOUDINARY_CLOUD_NAME);

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // File uploaded successfully, now delete local file
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Cloudinary upload error: ", error.message);

        // Clean up the local file in case of an error
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Return a consistent error structure
        return null;
    }
};


const deleteFromCloudinary = async (url) => {
    try {

        const parts = url.split('/upload/');
        const filePath = parts[1];  // This is 'v1620417346/sample_folder/sample_image.jpg'

        // Remove version number and file extension
        const publicId = filePath.split(/[\/\.]/).slice(1, -1).join('/');
        const responce = await cloudinary.uploader.destroy('sample_folder/sample_image', function (error, result) {
            if (error) {
                console.error('Error deleting file:', error);
            } else {
                console.log('File deleted successfully:', result);
            }
        });

        return responce;

    } catch (e) {
        return null;
    }
}





export { uploadOnCloudinary, deleteFromCloudinary };