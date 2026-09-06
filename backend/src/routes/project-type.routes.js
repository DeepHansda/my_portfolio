const express = require("express");
const {
  createProjectType,
  getProjectTypes,
  deleteProjectType,
} = require("../controllers/project-type.controller");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// Standard RESTful routes
router.get("/project-types", getProjectTypes);
router.post("/project-types", authMiddleware, createProjectType);
router.delete("/project-types/:id", authMiddleware, deleteProjectType);

// Legacy / alias routes
router.get("/getProjectTypes", getProjectTypes);
router.post("/createProjectType", authMiddleware, createProjectType);
router.delete("/deleteProjectType/:id", authMiddleware, deleteProjectType);
router.post("/deleteProjectType/:id", authMiddleware, deleteProjectType);

module.exports = router;
