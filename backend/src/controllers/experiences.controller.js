const ExperienceModel = require("../db/models/experiences.model");

module.exports = {
  createExperience: async (req, res) => {
    try {
      const {
        title,
        companyName,
        companyLogo,
        des,
        duration,
        position,
        skills,
      } = req.body;

      const experience = new ExperienceModel({
        title,
        companyName,
        companyLogo,
        des,
        duration,
        position,
        skills,
      });

      await experience.save();

      res.status(200).json({
        status: 1,
        message: "Experience added successfully.",
        result: experience,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },

  getExperiences: async (req, res) => {
    try {
      const experiences = await ExperienceModel.find().sort({
        "duration.joiningDate": -1,
      });

      res.status(200).json({
        status: 1,
        message: "Success",
        experiences,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },

  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ExperienceModel.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({
          status: 0,
          message: "Experience not found.",
        });
      }

      res.status(200).json({
        status: 1,
        message: "Experience deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  },
};
