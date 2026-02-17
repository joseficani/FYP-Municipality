const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String },
    photoUrl: { type: String, trim: true },
    socialLinks: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
