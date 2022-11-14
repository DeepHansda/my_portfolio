const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();





const storage = multer.diskStorage({

  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/webp") {
    cb(null, true);
  } else {
    cb({ message: "file format not supported" }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinaryUploads = async (filePath, folder) => {
  return cloudinary.uploader
    .upload(filePath, { folder: folder })
    .then((result) => {
      return {
        message: "upload successful",
        public_id: result.public_id,
        url: result.url,
      };
    })
    .catch((error) => {
      return {
        message: "upload failed",
        error: error,
      };
    });
};

module.exports = {
  upload: upload,
  cloudinaryUploads: cloudinaryUploads,
};
