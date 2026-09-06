const mongoose = require("mongoose");
const ProjectTypeModel = require("../db/models/project-type.model");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  createProjectType: asyncHandler(async (req, res) => {
    const { key, name } = req.body;

    if (!key || !name) {
      return res.error("Both key and name are required.", 400);
    }

    const formattedKey = key.trim().toLowerCase();
    const existingType = await ProjectTypeModel.findOne({ key: formattedKey });
    if (existingType) {
      return res.error("Project type with this key already exists.", 409);
    }

    const projectType = new ProjectTypeModel({
      key: formattedKey,
      name: name.trim(),
    });

    const savedProjectType = await projectType.save();
    return res.success(savedProjectType, "Project type created successfully.", 201);
  }),

  getProjectTypes: asyncHandler(async (req, res) => {
    const projectTypes = await ProjectTypeModel.find().sort({ name: 1 });
    return res.success(projectTypes, "Success");
  }),

  deleteProjectType: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid project type ID format.", 400);
    }

    const result = await ProjectTypeModel.findByIdAndDelete(id);
    if (!result) {
      return res.error("Project type not found.", 404);
    }

    return res.success(result, "Project type deleted successfully.");
  }),
};
