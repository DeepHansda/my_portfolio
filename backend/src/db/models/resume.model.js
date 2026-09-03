const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    resume: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema, "resumes");

