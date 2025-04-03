const mongoose = require("mongoose");

const ExprienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    companyLogo: {
      type: String,
      trim: true,
      required: true,
    },
    des: {
      type: String,
      trim: true,
      required: true,
    },
    duration: {
      joiningDate: {
        type: Date,
        trim: true,
        required: true,
      },
      leavingDate: {
        type: Date,
        trim: true,
        required: true,
      },
    },
    position: {
      type: String,
      trim: true,
      required: true,
    },
    skills: [
      {
        key: { type: String, required: true, lowercase: true },
        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Exprience", ExprienceSchema);
