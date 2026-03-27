const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    serviceTitle: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: ["request"],
      default: "request",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    documents: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in_progress", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);