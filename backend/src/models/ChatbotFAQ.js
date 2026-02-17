const mongoose = require("mongoose");

const chatbotFAQSchema = new mongoose.Schema(
  {
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatbotFAQ", chatbotFAQSchema);
