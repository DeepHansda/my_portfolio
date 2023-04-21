const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  resume: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("resume", ResumeSchema);
