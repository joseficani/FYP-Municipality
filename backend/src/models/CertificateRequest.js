const mongoose = require("mongoose");

const certificateRequestSchema = new mongoose.Schema(
  {
    citizenId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    certificateType: { type: String, required: true, trim: true },
    purpose: { type: String, trim: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    documents: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("CertificateRequest", certificateRequestSchema);
