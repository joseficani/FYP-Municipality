const mongoose = require("mongoose");

const taxApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    taxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaxCatalog",
      required: true,
    },
    taxTitle: {
      type: String,
      required: true,
      trim: true,
    },
    arabicTitle: {
      type: String,
      default: "",
      trim: true,
    },
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
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    nationalId: {
      type: String,
      required: true,
      trim: true,
    },
    propertyReference: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    adminNote: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "review", "approved", "rejected"],
      default: "pending",
    },

    // when admin approved/rejected it
    resolvedAt: {
      type: Date,
      default: null,
    },

    // hidden only from user profile list
    hiddenFromProfile: {
      type: Boolean,
      default: false,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxApplication", taxApplicationSchema);