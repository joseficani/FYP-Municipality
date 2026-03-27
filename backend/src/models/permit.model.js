const mongoose = require("mongoose");

const permitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["construction", "business", "event", "renovation", "other"],
      default: "other",
    },
    
    permitCode: {
      type: String,
      trim: true,
      unique: true,
    },

    processingTime: {
      type: String,
      required: true,
      trim: true,
    },

    requiredDocuments: [
      {
        type: String,
        trim: true,
      },
    ],

    requiresLocation: {
      type: Boolean,
      default: true,
    },

    iconName: {
      type: String,
      default: "FileText",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Permit", permitSchema);