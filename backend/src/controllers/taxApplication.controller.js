const mongoose = require("mongoose");
const TaxApplication = require("../models/TaxApplication");
const TaxCatalog = require("../models/TaxCatalog");
const User = require("../models/user.model");

const createTaxApplication = async (req, res) => {
  try {
    const {
      taxId,
      fullName,
      phone,
      email,
      address,
      nationalId,
      propertyReference,
      notes,
    } = req.body;

    if (!taxId || !fullName || !phone || !email || !address || !nationalId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const authUserId = req.user?._id || req.user?.id || null;

    if (!authUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found in token.",
      });
    }

    const tax = await TaxCatalog.findById(taxId);

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: "Selected tax / fee was not found.",
      });
    }

    const loggedInUser = await User.findById(authUserId).select("email name");

    const normalizedEmail = (loggedInUser?.email || email || "")
      .trim()
      .toLowerCase();

    const application = await TaxApplication.create({
      userId: authUserId,
      taxId: tax._id,
      taxTitle: tax.title,
      arabicTitle: tax.arabicTitle || "",
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      address: address.trim(),
      nationalId: nationalId.trim(),
      propertyReference: propertyReference?.trim() || "",
      notes: notes?.trim() || "",
      status: "pending",
      resolvedAt: null,
      hiddenFromProfile: false,
    });

    return res.status(201).json({
      success: true,
      message: "Tax application submitted successfully.",
      data: application,
    });
  } catch (error) {
    console.error("createTaxApplication error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit tax application.",
      error: error.message,
    });
  }
};

const getAllTaxApplications = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const applications = await TaxApplication.find({
      $or: [
        { status: "pending" },
        { status: "review" },
        {
          status: { $in: ["approved", "rejected"] },
          $or: [
            { resolvedAt: null },
            { resolvedAt: { $gte: fiveMinutesAgo } },
          ],
        },
      ],
    })
      .populate("taxId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("getAllTaxApplications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tax applications.",
      error: error.message,
    });
  }
};

const getTaxApplicationById = async (req, res) => {
  try {
    const application = await TaxApplication.findById(req.params.id)
      .populate("taxId")
      .populate("userId", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Tax application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("getTaxApplicationById error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tax application.",
      error: error.message,
    });
  }
};

const updateTaxApplicationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    if (!["pending", "review", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value.",
      });
    }

    const application = await TaxApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Tax application not found.",
      });
    }

    application.status = status;
    application.adminNote = adminNote ?? application.adminNote;

    if (status === "approved" || status === "rejected") {
      application.resolvedAt = new Date();
    } else {
      application.resolvedAt = null;
    }

    const updatedApplication = await application.save();

    return res.status(200).json({
      success: true,
      message: "Tax application status updated successfully.",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("updateTaxApplicationStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application status.",
      error: error.message,
    });
  }
};

const hideMyTaxApplicationFromProfile = async (req, res) => {
  try {
    const authUserId = req.user?._id || req.user?.id || null;
    const authEmail = (req.user?.email || "").trim().toLowerCase();

    const application = await TaxApplication.findOne({
      _id: req.params.id,
      $or: [
        ...(authUserId && mongoose.Types.ObjectId.isValid(authUserId)
          ? [{ userId: authUserId }]
          : []),
        ...(authEmail ? [{ email: authEmail }] : []),
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Tax application not found for this user.",
      });
    }

    application.hiddenFromProfile = true;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Tax application removed from profile successfully.",
    });
  } catch (error) {
    console.error("hideMyTaxApplicationFromProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove tax application from profile.",
      error: error.message,
    });
  }
};

module.exports = {
  createTaxApplication,
  getAllTaxApplications,
  getTaxApplicationById,
  updateTaxApplicationStatus,
  hideMyTaxApplicationFromProfile,
};