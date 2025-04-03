const express = require("express");
const {
  createExperience,
  getExperiences,
  deleteExperience,
} = require("../controllers/experiences.controller");

const router = new express.Router();

router.post("/createExperience", createExperience);
router.get("/getExperiences", getExperiences);
router.delete("/deleteExperience/:id", deleteExperience);

module.exports = router;
