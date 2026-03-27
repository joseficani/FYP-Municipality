const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
} = require("../controllers/complaints.controller");

const uploadComplaintImages = require("../middlewares/uploadComplaintImages");

router.post("/", uploadComplaintImages.array("images", 4), createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);

module.exports = router;