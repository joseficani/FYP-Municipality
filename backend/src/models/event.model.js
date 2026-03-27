const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },

    location: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },

    category: {
      type: String,
      required: true,
      enum: [
        "Community",
        "Arts & Culture",
        "Sports & Recreation",
        "Government",
        "Health & Wellness",
        "Education",
      ],
    },

    organizer: { type: String, required: true },
    cost: { type: String, required: true },

    image: { type: String, required: true },
    gallery: { type: [String], default: [] },

    featured: { type: Boolean, default: false },

    // ✅ ADD THIS
    type: {
      type: String,
      enum: ["official", "citizen"],
      default: "official",
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", eventSchema);