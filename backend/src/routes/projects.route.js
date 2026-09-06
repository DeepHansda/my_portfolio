const express = require("express");
const router = new express.Router();
const {
  uploadProjects,
  showProjects,
  deleteProject,
  getProjectById,
} = require("../controllers/projects.controller");
const { upload } = require("../services/projects.service");
const authMiddleware = require("../middleware/auth");

// Legacy routes (for backwards-compatibility with admin & client)
router.post("/uploadProject", authMiddleware, upload.array("img", 4), uploadProjects);
router.get("/getProjects", showProjects);
router.get("/getProject/:id", getProjectById);
router.post("/deleteProject/:id", authMiddleware, deleteProject);
router.delete("/deleteProject/:id", authMiddleware, deleteProject);

// Standard RESTful aliases
router.get("/projects", showProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", authMiddleware, upload.array("img", 4), uploadProjects);
router.delete("/projects/:id", authMiddleware, deleteProject);

module.exports = router;