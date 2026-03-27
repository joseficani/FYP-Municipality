const express = require("express");
const router = express.Router();
const {
  createTaxApplication,
  getAllTaxApplications,
  getTaxApplicationById,
  updateTaxApplicationStatus,
  hideMyTaxApplicationFromProfile,
} = require("../controllers/taxApplication.controller");
const {protect} = require("../middlewares/auth.middleware");

router.post("/", protect, createTaxApplication);
router.get("/", getAllTaxApplications);
router.get("/:id", getTaxApplicationById);
router.patch("/:id/status", updateTaxApplicationStatus);
router.patch("/:id/hide", protect, hideMyTaxApplicationFromProfile);

module.exports = router;