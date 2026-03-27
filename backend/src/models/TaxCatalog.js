const mongoose = require("mongoose");

const taxCatalogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    arabicTitle: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    categoryTitle: {
      type: String,
      required: true,
      trim: true,
    },
    categoryArabicTitle: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    conditions: {
      type: String,
      default: "",
      trim: true,
    },
    requiredDocuments: {
      type: [String],
      default: [],
    },
    paymentPeriod: {
      type: String,
      default: "",
      trim: true,
    },
    estimatedAmount: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxCatalog", taxCatalogSchema);