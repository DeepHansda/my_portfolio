const mongoose = require("mongoose");
const { cloudinaryUploads, deleteCloudinaryImage } = require("../services/projects.service");
const ProjectModel = require("../db/models/project.model");
const ProjectTypeModel = require("../db/models/project-type.model");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  uploadProjects: asyncHandler(async (req, res) => {
    const imgUrlList = [];
    const files = req.files || [];

    for (let file of files) {
      const result = await cloudinaryUploads(file.path, "portfolio_images");

      if (!result.success) {
        return res.error(result.message || "Error uploading image to Cloudinary", 400, result.error);
      }

      imgUrlList.push({
        img: result.url,
        public_id: result.public_id,
      });
    }

    const {
      type,
      title,
      description,
      tech_list,
      visit_link,
      git_link,
      startingDate,
      endingDate,
      rating,
    } = req.body;

    if (!title || !description || !type) {
      return res.error("Type, title, and description are required", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(type)) {
      return res.error("Invalid project type ID format", 400);
    }

    const typeExists = await ProjectTypeModel.findById(type);
    if (!typeExists) {
      return res.error("Project type not found", 404);
    }

    let techList = [];
    if (tech_list) {
      try {
        if (Array.isArray(tech_list)) {
          techList = tech_list.map((tech) => (typeof tech === "string" ? JSON.parse(tech) : tech));
        } else if (typeof tech_list === "string") {
          techList = JSON.parse(tech_list);
        }
      } catch (parseError) {
        return res.error("Invalid tech_list format. Must be valid JSON array.", 400, parseError.message);
      }
    }

    const projectData = {
      type,
      project_img: imgUrlList,
      title,
      description,
      tech_list: Array.isArray(techList) ? techList : [],
      visit_link: visit_link || "",
      git_link: git_link || "",
      duration: {
        startingDate: startingDate || null,
        endingDate: endingDate || null,
      },
      rating: rating ? Number(rating) : 0,
    };

    const project = new ProjectModel(projectData);
    const savedProject = await project.save();

    return res.success(savedProject, "Project added successfully", 201);
  }),

  showProjects: asyncHandler(async (req, res) => {
    const { type } = req.query;
    let filter = {};

    if (type && type.trim().toLowerCase() !== "all") {
      if (mongoose.Types.ObjectId.isValid(type)) {
        filter.type = type;
      } else {
        const rawKey = type.trim();
        const slugKey = rawKey
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
        const escapedKey = rawKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const foundType = await ProjectTypeModel.findOne({
          $or: [
            { key: rawKey.toLowerCase() },
            { key: slugKey },
            { name: new RegExp(`^${escapedKey}$`, "i") },
          ],
        });
        if (foundType) {
          filter.type = foundType._id;
        } else {
          return res.success([], "Success");
        }
      }
    }

    const projects = await ProjectModel.find(filter)
      .populate("type")
      .sort({ rating: -1, createdAt: -1 });

    return res.success(projects, "Success");
  }),

  deleteProject: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid project ID", 400);
    }

    const project = await ProjectModel.findById(id);
    if (!project) {
      return res.error("Project not found", 404);
    }

    if (Array.isArray(project.project_img)) {
      for (const imgObj of project.project_img) {
        if (imgObj.public_id) {
          await deleteCloudinaryImage(imgObj.public_id);
        }
      }
    }

    await ProjectModel.findByIdAndDelete(id);

    return res.success(project, "Deleted successfully");
  }),

  getProjectById: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid project ID", 400);
    }

    const project = await ProjectModel.findById(id).populate("type");
    if (!project) {
      return res.error("Project not found", 404);
    }

    return res.success(project, "Success");
  }),
};
