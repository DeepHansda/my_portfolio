const mongoose = require("mongoose");
const ResumeModel = require("../db/models/resume.model");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  uploadResume: asyncHandler(async (req, res) => {
    const { link } = req.body;

    if (!link || typeof link !== "string" || !link.trim()) {
      return res.error("A valid resume link is required.", 400);
    }

    const resume = new ResumeModel({
      resume: link.trim(),
      isActive: true,
    });

    const savedResume = await resume.save();
    return res.success(savedResume, "Resume added successfully.", 201);
  }),

  getResume: asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.active !== undefined) {
      filter.isActive = req.query.active === "true";
    }

    const resumes = await ResumeModel.find(filter).sort({ createdAt: -1 });

    if (req.query.latest === "true") {
      return res.success(resumes[0] || null, "Success");
    }

    return res.success(resumes, "Success");
  }),

  deleteResume: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid resume ID format.", 400);
    }

    const deletedResume = await ResumeModel.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.error("Resume not found.", 404);
    }

    return res.success(deletedResume, "Resume deleted successfully.");
  }),
};
