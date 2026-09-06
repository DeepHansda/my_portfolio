const mongoose = require("mongoose");
const ExperienceModel = require("../db/models/experiences.model");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  createExperience: asyncHandler(async (req, res) => {
    const {
      title,
      companyName,
      companyLogo,
      des,
      duration,
      position,
      skills,
    } = req.body;

    if (!title || !companyName || !position) {
      return res.error("Title, company name, and position are required.", 400);
    }

    const experience = new ExperienceModel({
      title: title.trim(),
      companyName: companyName.trim(),
      companyLogo: companyLogo || "",
      des: des || "",
      duration: duration || {},
      position: position.trim(),
      skills: Array.isArray(skills) ? skills : [],
    });

    const savedExperience = await experience.save();

    return res.success(savedExperience, "Experience added successfully.", 201);
  }),

  getExperiences: asyncHandler(async (req, res) => {
    const experiences = await ExperienceModel.find().sort({
      "duration.joiningDate": -1,
    });

    return res.success(experiences, "Success");
  }),

  deleteExperience: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid experience ID format.", 400);
    }

    const result = await ExperienceModel.findByIdAndDelete(id);

    if (!result) {
      return res.error("Experience not found.", 404);
    }

    return res.success(result, "Experience deleted successfully.");
  }),
};
