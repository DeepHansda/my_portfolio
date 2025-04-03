const ResumeModel = require("../db/models/resume.model");

module.exports = {
  uploadResume: async (req, res) => {
    try {
      const { link } = req.body;

      const resume = new ResumeModel({ resume: link });
      const savedResume = await resume.save();

      res.status(201).json({
        success: 1,
        message: "Resume added successfully.",
        data: savedResume,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },

  getResume: async (req, res) => {
    try {
      const resumes = await ResumeModel.find();

      if (!resumes.length) {
        return res.status(404).json({
          success: 0,
          message: "No resumes found.",
        });
      }

      res.status(200).json({
        success: 1,
        message: "Success",
        data: resumes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },

  deleteResume: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedResume = await ResumeModel.findByIdAndDelete(id);

      if (!deletedResume) {
        return res.status(404).json({
          success: 0,
          message: "Resume not found.",
        });
      }

      res.status(200).json({
        success: 1,
        message: "Resume deleted successfully.",
        data: deletedResume,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },
};
