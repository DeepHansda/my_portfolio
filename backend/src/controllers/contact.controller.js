const { mailService } = require("../services/contact.service");
const ContactModel = require("../db/models/contacts.model");

module.exports = {
  createContact: async (req, res) => {
    try {
      const { fullName, email, contactNumber, message } = req.body;
      const data = { fullName, email, contactNumber, message };

      const mailResponse = await mailService(data);

      if (!mailResponse) {
        return res.status(400).json({
          success: 0,
          message: "Something went wrong while sending email",
        });
      }

      const contact = new ContactModel(data);
      const savedContact = await contact.save();

      res.status(201).json({
        success: 1,
        message: "Message created successfully",
        data: savedContact,
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

  showContacts: async (req, res) => {
    try {
      const contacts = await ContactModel.find({});

      if (!contacts.length) {
        return res.status(404).json({
          success: 0,
          message: "Contacts not found",
        });
      }

      res.status(200).json({
        success: 1,
        message: "Success",
        data: contacts,
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

  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await ContactModel.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({
          success: 0,
          message: "Contact not found",
        });
      }

      res.status(200).json({
        success: 1,
        message: "Contact deleted successfully",
        data: deletedContact,
      });
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
