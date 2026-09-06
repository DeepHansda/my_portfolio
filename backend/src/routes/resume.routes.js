const express = require("express");
const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/auth");

const router = new express.Router();

// Legacy routes (backwards-compatible with client & admin)
router.post("/createResume", authMiddleware, uploadResume);
router.get("/getResume", getResume);
router.delete("/deleteResume/:id", authMiddleware, deleteResume);
router.post("/deleteResume/:id", authMiddleware, deleteResume);

// Standard RESTful aliases
router.get("/resumes", getResume);
router.post("/resumes", authMiddleware, uploadResume);
router.delete("/resumes/:id", authMiddleware, deleteResume);

module.exports = router;
