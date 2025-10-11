const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Wanderlust_DEV",
    allowed_formats: ['jpeg', 'png', 'jpg','webp','gif','svg','mp4','mov','avi','mkv','webm'],
  },
});

module.exports = { cloudinary, storage };
 