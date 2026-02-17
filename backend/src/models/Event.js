const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    coverImageUrl: { type: String, trim: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
