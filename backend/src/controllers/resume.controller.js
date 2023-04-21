const ResumeModel = require("../db/models/resume.model");
module.exports = {
  uploadResume: async (req, res) => {
    try {
      const { link } = req.body;

      const resume = ResumeModel({ resume: link });

      await resume.save((err, result) => {
        if (err) {
          res.status(404).json({
            status: 0,
            message: "something went wrong.",
            error: err.message,
          });
        }
        res.status(200).json({
          status: 1,
          message: "Resume Added Successfully.",
          result: result,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
  getResume: async (req, res) => {
    try {
      await ResumeModel.find().exec((error, result) => {
        if (error) {
          res.status(404).json({
            status: 0,
            message: "something went wrong.",
            error: error.message,
          });
        }
        res.status(200).json({
          status: 1,
          message: "success",
          result,
        });
      });
    } catch (error) {
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
  deleteResume: async (req, res) => {
    try {
      const { id } = req.params;
      await ResumeModel.findByIdAndDelete({ _id: id }).exec((error, result) => {
        if (error) {
          res.status(404).json({
            status: 0,
            message: "something went wrong.",
            error: error.message,
          });
        }
        res.status(200).json({
          status: 1,
          message: "resume deleted.",
        });
      });
    } catch (error) {
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
};
