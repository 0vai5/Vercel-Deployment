import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (fileBuffer) => {
  try {
    const response = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      stream.end(fileBuffer);
    });

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};

export default uploadFile;
