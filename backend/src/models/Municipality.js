const mongoose = require("mongoose");

const municipalitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    logoUrl: { type: String, trim: true },
    colors: {
      primary: { type: String, default: "#1E3A8A" },
      secondary: { type: String, default: "#0EA5E9" }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Municipality", municipalitySchema);
