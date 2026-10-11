import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

const hasCloudinaryConfig = [
  ENV.CLOUDINARY_CLOUD_NAME,
  ENV.CLOUDINARY_API_KEY,
  ENV.CLOUDINARY_API_SECRET,
].every((value) => value && !/your_|placeholder|change_me/i.test(value));

export async function storeImage(image) {
  if (!hasCloudinaryConfig) return image;

  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      resource_type: "image",
      folder: "chatify",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.warn("Cloudinary upload failed; storing the optimized image in MongoDB:", error.message);
    return image;
  }
}

export default cloudinary;
