const Complaint = require("../models/complaint.model");

const createComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      category,
      priority,
      location,
      description,
      mapPinX,
      mapPinY,
    } = req.body;

    if (!name || !email || !category || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/complaints/${file.filename}`)
      : [];

    const complaint = await Complaint.create({
      name,
      email,
      phone,
      address,
      category,
      priority,
      location,
      description,
      mapPin: {
        x: mapPinX ? Number(mapPinX) : null,
        y: mapPinY ? Number(mapPinY) : null,
      },
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      data: complaint,
    });
  } catch (error) {
    console.error("Create complaint error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating complaint.",
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error("Get complaints error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaints.",
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error("Get complaint by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaint.",
    });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
};