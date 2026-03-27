const ContactMessage = require("../models/contactMessage.model");

const createContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const savedMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Create contact message error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while submitting contact message.",
    });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching contact messages.",
    });
  }
};

const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("Get contact message by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching contact message.",
    });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
};