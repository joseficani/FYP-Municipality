const mongoose = require("mongoose");
 
const certificateRequestSchema = new mongoose.Schema(
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
      enum: ["certificate", "request"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    documents: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "In Review", "Approved", "Rejected"],
      default: "Pending",
    },
    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },
    signedCertificate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("CertificateRequest", certificateRequestSchema);
 