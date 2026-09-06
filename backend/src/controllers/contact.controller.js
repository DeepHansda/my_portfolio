const mongoose = require("mongoose");
const ContactModel = require("../db/models/contacts.model");
const { mailService } = require("../services/contact.service");
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  createContact: asyncHandler(async (req, res) => {
    const { fullName, email, contactNumber, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.error("Full name is required", 400);
    }
    if (!email || !email.trim()) {
      return res.error("Email is required", 400);
    }
    if (!message || !message.trim()) {
      return res.error("Message is required", 400);
    }

    const data = {
      fullName: fullName.trim(),
      email: email.trim(),
      contactNumber: contactNumber ? String(contactNumber).trim() : "",
      message: message.trim(),
    };

    // 1. Save to MongoDB FIRST to guarantee zero message loss
    const contact = new ContactModel(data);
    const savedContact = await contact.save();

    // 2. Trigger auto-reply and admin notification in background
    mailService(data).catch((mailErr) => {
      console.error("Email notification failed:", mailErr.message);
    });

    return res.success(savedContact, "Message created successfully", 201);
  }),

  showContacts: asyncHandler(async (req, res) => {
    const contacts = await ContactModel.find({}).sort({ createdAt: -1 });
    // Always return 200 OK with contacts list (even if empty)
    return res.success(contacts, "Success");
  }),

  deleteContact: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error("Invalid contact ID", 400);
    }

    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.error("Contact not found", 404);
    }

    return res.success(deletedContact, "Contact deleted successfully");
  }),
};
