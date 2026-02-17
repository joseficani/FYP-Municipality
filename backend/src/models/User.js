const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String }, // later if you add auth
    role: { type: String, enum: ["citizen", "admin"], default: "citizen" },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
