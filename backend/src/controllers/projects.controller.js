const fs = require("fs");
const { cloudinaryUploads } = require("../services/projects.service");
const ProjectModel = require("../db/models/project.model");

module.exports = {
  uploadProjects: async (req, res) => {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: 0, message: "Method not allowed" });
    }

    try {
      const imgUrlList = [];
      const folderName = "portfolio_images";

      for (let file of req.files) {
        const path = file.path;
        const result = await cloudinaryUploads(path, folderName);

        if (result.error) {
          console.error(result.error);
          return res.status(400).json({
            success: 0,
            message: "Error when uploading",
            error: result.error,
          });
        }

        imgUrlList.push({ img: result.url });
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
      } = req.body;

      let techList = [];

      if (Array.isArray(tech_list)) {
        techList = tech_list.map((tech) => JSON.parse(tech));
      } else {
        try {
          techList = JSON.parse(tech_list);
        } catch (error) {
          return res.status(400).json({
            success: 0,
            message: "Invalid tech_list format",
            error: error.message,
          });
        }
      }

      const project = new ProjectModel({
        type,
        project_img: imgUrlList,
        title,
        description,
        tech_list: techList,
        visit_link,
        git_link,
        duration: {
          startingDate,
          endingDate,
        },
      });

      const savedProject = await project.save();

      res.status(201).json({
        success: 1,
        message: "Project added successfully",
        data: savedProject,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  showProjects: async (req, res) => {
    try {
      const { type } = req.query;
      const filter = type ? { type } : {};
      const projects = await ProjectModel.find(filter).sort({ rating: -1 });

      if (!projects.length) {
        return res
          .status(404)
          .json({ success: 0, message: "Projects not found!" });
      }

      res.status(200).json({ success: 1, data: projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await ProjectModel.findByIdAndDelete(id);

      if (!project) {
        return res
          .status(404)
          .json({ success: 0, message: "Project not found" });
      }

      res
        .status(200)
        .json({ success: 1, message: "Deleted successfully", data: project });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Deletion failed",
        error: error.message,
      });
    }
  },
};
