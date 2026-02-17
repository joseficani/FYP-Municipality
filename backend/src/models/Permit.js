const mongoose = require("mongoose");

const permitSchema = new mongoose.Schema(
  {
    citizenId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    type: { type: String, required: true, trim: true },
    details: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    documents: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permit", permitSchema);
