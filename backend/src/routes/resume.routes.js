const express = require("express");
const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controllers/resume.controller");
const router = new express.Router();

router.post("/createResume", uploadResume);
router.get("/getResume", getResume);
router.delete("/deleteResume/:id", deleteResume);

module.exports = router;
