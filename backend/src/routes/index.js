const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");

const { createOne, getAll, getOne, updateOne, deleteOne } = require("../controllers/factory.controller");

// Models
const User = require("../models/User");
const Municipality = require("../models/Municipality");
const News = require("../models/News");
const Event = require("../models/Event");
const Complaint = require("../models/Complaint");
const Permit = require("../models/Permit");
const CertificateRequest = require("../models/CertificateRequest");
const TaxFee = require("../models/TaxFee");
const Notification = require("../models/Notification");
const ChatbotFAQ = require("../models/ChatbotFAQ");
const ContactMessage = require("../models/ContactMessage");
const TeamMember = require("../models/TeamMember");

// ✅ Auth routes go FIRST
router.use("/auth", authRoutes);

// Helper to build CRUD routes quickly
const crud = (path, Model) => {
  router.post(`/${path}`, createOne(Model));
  router.get(`/${path}`, getAll(Model));
  router.get(`/${path}/:id`, getOne(Model));
  router.put(`/${path}/:id`, updateOne(Model));
  router.delete(`/${path}/:id`, deleteOne(Model));
};

crud("users", User);
crud("municipalities", Municipality);
crud("news", News);
crud("events", Event);
crud("complaints", Complaint);
crud("permits", Permit);
crud("certificate-requests", CertificateRequest);
crud("taxes-fees", TaxFee);
crud("notifications", Notification);
crud("chatbot-faqs", ChatbotFAQ);
crud("contact-messages", ContactMessage);
crud("team-members", TeamMember);

router.get("/health", (req, res) => res.json({ ok: true, message: "API healthy ✅" }));

module.exports = router;
