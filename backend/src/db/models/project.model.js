const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    project_img: [
      {
        img: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    tech_list: [{ tech: String, name: String }],
    visit_link: {
      type: String,
      required: true,
      trim: true,
    },
    git_link: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      startingDate: {
        type: Date,
        required: true,
      },
      endingDate: {
        type: Date,
        required: true,
      },
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
