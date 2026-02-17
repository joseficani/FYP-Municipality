const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    citizenId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["submitted", "in_review", "resolved", "rejected"], default: "submitted" },
    attachments: [{ type: String, trim: true }],
    locationText: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
