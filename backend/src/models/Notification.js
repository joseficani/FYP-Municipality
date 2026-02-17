const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, trim: true } // status_update, news, etc
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
