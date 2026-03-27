const express = require("express");
const router = express.Router();

const {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
} = require("../controllers/contact.controller");

router.post("/", createContactMessage);
router.get("/", getAllContactMessages);
router.get("/:id", getContactMessageById);

module.exports = router;