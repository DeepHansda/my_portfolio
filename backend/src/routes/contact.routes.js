const express = require("express");
const router = new express.Router();
const rateLimit = require("express-rate-limit");
const {
  createContact,
  showContacts,
  deleteContact,
} = require("../controllers/contact.controller");
const authMiddleware = require("../middleware/auth");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: 0,
    message: "Too many contact submissions from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Legacy routes (backwards-compatible with client & admin)
router.post("/createContact", contactLimiter, createContact);
router.get("/showContacts", authMiddleware, showContacts);
router.post("/deleteContact/:id", authMiddleware, deleteContact);
router.delete("/deleteContact/:id", authMiddleware, deleteContact);

// Standard RESTful aliases
router.post("/contacts", contactLimiter, createContact);
router.get("/contacts", authMiddleware, showContacts);
router.delete("/contacts/:id", authMiddleware, deleteContact);

module.exports = router;