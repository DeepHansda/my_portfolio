const mongoose = require("mongoose");
const { cloudinaryUploads, deleteCloudinaryImage } = require("../services/projects.service");
const ProjectModel = require("../db/models/project.model");
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
    const filter = type ? { type } : {};
    const projects = await ProjectModel.find(filter).sort({ rating: -1 });

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
};
