const express = require("express");
const {
  createExperience,
  getExperiences,
  deleteExperience,
} = require("../controllers/experiences.controller");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// Legacy routes (backwards-compatible with client & admin)
router.post("/createExperience", authMiddleware, createExperience);
router.get("/getExperiences", getExperiences);
router.delete("/deleteExperience/:id", authMiddleware, deleteExperience);
router.post("/deleteExperience/:id", authMiddleware, deleteExperience);

// Standard RESTful aliases
router.get("/experiences", getExperiences);
router.post("/experiences", authMiddleware, createExperience);
router.delete("/experiences/:id", authMiddleware, deleteExperience);

module.exports = router;
