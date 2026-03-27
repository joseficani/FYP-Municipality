const PermitRequest = require("../models/permitRequest.model");
const Permit = require("../models/permit.model");

const createPermitRequest = async (req, res) => {
  try {
    const {
      permitId,
      firstName,
      lastName,
      email,
      phone,
      address,
      locationLat,
      locationLng,
      locationAddress,
    } = req.body;

    if (!permitId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const permit = await Permit.findById(permitId);

    if (!permit) {
      return res.status(404).json({
        success: false,
        message: "Selected permit was not found.",
      });
    }

    const documents = req.files
      ? req.files.map((file) => `/uploads/permits/${file.filename}`)
      : [];

    const permitRequest = await PermitRequest.create({
      user: req.user._id,
      permitId: permit._id,
      permitTitle: permit.title,
      firstName,
      lastName,
      email,
      phone,
      address,
      documents,
      location: {
        lat: locationLat && !isNaN(Number(locationLat)) ? Number(locationLat) : null,
        lng: locationLng && !isNaN(Number(locationLng)) ? Number(locationLng) : null,
        address: locationAddress || "",
      },
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Permit request submitted successfully.",
      data: permitRequest,
    });
  } catch (error) {
    console.error("Create permit request error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting permit request.",
    });
  }
};

const getAllPermitRequests = async (req, res) => {
  try {
    const permitRequests = await PermitRequest.find()
      .populate("user", "name email municipality")
      .populate("permitId", "title category processingTime")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: permitRequests.length,
      data: permitRequests,
    });
  } catch (error) {
    console.error("Get permit requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching permit requests.",
    });
  }
};

const getMyPermitRequests = async (req, res) => {
  try {
    const permitRequests = await PermitRequest.find({ user: req.user._id })
      .populate("permitId", "title category processingTime")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: permitRequests.length,
      data: permitRequests,
    });
  } catch (error) {
    console.error("Get my permit requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching your permit requests.",
    });
  }
};

const getPermitRequestById = async (req, res) => {
  try {
    const permitRequest = await PermitRequest.findById(req.params.id)
      .populate("user", "name email municipality")
      .populate("permitId", "title category processingTime requiredDocuments");

    if (!permitRequest) {
      return res.status(404).json({
        success: false,
        message: "Permit request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: permitRequest,
    });
  } catch (error) {
    console.error("Get permit request by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching permit request.",
    });
  }
};

const updatePermitRequestStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const allowedStatuses = ["pending", "review", "approved", "rejected"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value.",
      });
    }

    const permitRequest = await PermitRequest.findById(req.params.id);

    if (!permitRequest) {
      return res.status(404).json({
        success: false,
        message: "Permit request not found.",
      });
    }

    permitRequest.status = status;

    if (typeof adminNote === "string") {
      permitRequest.adminNote = adminNote.trim();
    }

    const updatedPermitRequest = await permitRequest.save();

    return res.status(200).json({
      success: true,
      message: "Permit request status updated successfully.",
      data: updatedPermitRequest,
    });
  } catch (error) {
    console.error("Update permit request status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating permit request status.",
    });
  }
};

module.exports = {
  createPermitRequest,
  getAllPermitRequests,
  getMyPermitRequests,
  getPermitRequestById,
  updatePermitRequestStatus,
};