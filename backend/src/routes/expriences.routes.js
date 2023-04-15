const express = require("express");
const { createExprience, getExpriences, deleteExprience } = require("../controllers/expriences.controller");
const router = new express.Router();

router.post("/createExprience", createExprience);
router.get("/getExpriences",getExpriences)
router.delete("/deleteExprience/:id",deleteExprience)


module.exports = router;
