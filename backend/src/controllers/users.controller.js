const mongoose = require("mongoose");
const User = require("../models/user.model");
const PermitRequest = require("../models/permitRequest.model");
const TaxApplication = require("../models/TaxApplication");

// later:
// const Complaint = require("../models/complaint.model");
// const CertificateRequest = require("../models/certificateRequest.model");
// const ProjectTenderApplication = require("../models/projectTenderApplication.model");

const getMyProfile = async (req, res) => {
  try {
    const authUserId = req.user?._id || req.user?.id;

    const user = await User.findById(authUserId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile.",
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      municipality,
      residentSince,
      address,
      bio,
      profileImage,
    } = req.body;

    const authUserId = req.user?._id || req.user?.id;
    const user = await User.findById(authUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use.",
        });
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.municipality = municipality ?? user.municipality;
    user.residentSince = residentSince ?? user.residentSince;
    user.address = address ?? user.address;
    user.bio = bio ?? user.bio;
    user.profileImage = profileImage ?? user.profileImage;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        municipality: updatedUser.municipality,
        residentSince: updatedUser.residentSince,
        address: updatedUser.address,
        bio: updatedUser.bio,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile.",
    });
  }
};

const getMyActivities = async (req, res) => {
  try {
    const authUserId = req.user?._id || req.user?.id || null;
    const userEmail = (req.user?.email || "").trim().toLowerCase();

    const permitQuery = [];
    const taxQuery = [];

    if (authUserId && mongoose.Types.ObjectId.isValid(authUserId)) {
      permitQuery.push({ user: authUserId }, { userId: authUserId });
      taxQuery.push({ userId: authUserId });
    }

    if (userEmail) {
      permitQuery.push({ email: userEmail });
      taxQuery.push({ email: userEmail });
    }

    const permits = await PermitRequest.find(
      permitQuery.length ? { $or: permitQuery } : {}
    )
      .populate("permitId")
      .sort({ createdAt: -1 });

    const taxes = await TaxApplication.find({
      ...(taxQuery.length ? { $or: taxQuery } : {}),
      hiddenFromProfile: { $ne: true },
    })
      .populate("taxId")
      .sort({ createdAt: -1 });

    const complaints = [];
    const certificates = [];
    const projectsTenders = [];

    return res.status(200).json({
      success: true,
      data: {
        complaints,
        permits,
        certificates,
        taxes,
        projectsTenders,
      },
    });
  } catch (error) {
    console.error("Get my activities error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching activities.",
      error: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getMyActivities,
};