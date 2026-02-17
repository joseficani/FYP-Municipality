const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String, trim: true },
    published: { type: Boolean, default: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
