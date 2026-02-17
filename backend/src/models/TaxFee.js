const mongoose = require("mongoose");

const taxFeeSchema = new mongoose.Schema(
  {
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "LBP" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxFee", taxFeeSchema);
