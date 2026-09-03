const responseHandler = (req, res, next) => {
  res.success = (data = null, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      success: 1,
      message,
      data,
    });
  };

  res.error = (message = "Something went wrong", statusCode = 500, error = null) => {
    const payload = {
      success: 0,
      message,
    };
    if (error !== null && error !== undefined) {
      payload.error = error;
    }
    return res.status(statusCode).json(payload);
  };

  next();
};

module.exports = responseHandler;
