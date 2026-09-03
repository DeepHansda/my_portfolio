const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs").promises;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported. Allowed formats: JPEG, PNG, WebP"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const cloudinaryUploads = async (filePath, folder = "portfolio_images") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return {
      success: true,
      message: "upload successful",
      public_id: result.public_id,
      url: result.secure_url || result.url,
    };
  } catch (error) {
    return {
      success: false,
      message: "upload failed",
      error: error.message || error,
    };
  } finally {
    // Always clean up local temporary file after upload attempt
    try {
      await fs.unlink(filePath);
    } catch (unlinkErr) {
      // Ignore if file was already removed
    }
  }
};

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (err) {
    console.error(`Failed to delete Cloudinary image with public_id ${publicId}:`, err.message);
  }
};

module.exports = {
  upload,
  cloudinaryUploads,
  deleteCloudinaryImage,
};
