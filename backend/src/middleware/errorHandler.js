const errorHandler = (err, req, res, next) => {
  console.error("Internal Error:", err);

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    return res.error(`Invalid format for ${err.path}: ${err.value}`, 400);
  }

  // Mongoose schema validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.error("Validation error", 400, messages);
  }

  // Multer upload errors
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.error("File size is too large (max 10MB)", 400);
    }
    return res.error(`Upload error: ${err.message}`, 400);
  }

  // Custom file filter rejection
  if (err.message && err.message.toLowerCase().includes("file format not supported")) {
    return res.error(err.message, 400);
  }

  // Fallback 500
  const isDev = process.env.NODE_ENV === "development";
  return res.error(
    err.message || "Internal server error",
    err.statusCode || 500,
    isDev ? err.stack : undefined
  );
};

module.exports = errorHandler;
