const CertificateRequest = require("../models/certificateRequest.model");
 
const createCertificateRequest = async (req, res) => {
  try {
    const { fullName, phone, serviceTitle, serviceType, description } = req.body;
 
    if (!fullName || !phone || !serviceTitle || !serviceType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }
 
    const documentPaths = req.files
      ? req.files.map((file) => `/uploads/certificates/${file.filename}`)
      : [];
 
    const savedRequest = await CertificateRequest.create({
      fullName,
      phone,
      serviceTitle,
      serviceType,
      description: description || "",
      documents: documentPaths,
      status: "Pending",
    });
 
    return res.status(201).json({
      success: true,
      message: "Request submitted successfully.",
      data: savedRequest,
    });
  } catch (error) {
    console.error("Create certificate/request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while creating request.",
    });
  }
};
 
const getAllCertificateRequests = async (req, res) => {
  try {
    const requests = await CertificateRequest.find().sort({ createdAt: -1 });
 
    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get certificate requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching requests.",
    });
  }
};
 
const getCertificateRequestById = async (req, res) => {
  try {
    const request = await CertificateRequest.findById(req.params.id);
 
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }
 
    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Get certificate request by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching request.",
    });
  }
};
 
const updateCertificateRequestStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
 
    const allowedStatuses = ["Pending", "In Review", "Approved", "Rejected"];
 
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required.",
      });
    }
 
    const updateData = {
      status,
    };
 
    if (typeof adminNotes === "string") {
      updateData.adminNotes = adminNotes;
    }
 
    const updatedRequest = await CertificateRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
 
    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }
 
    return res.status(200).json({
      success: true,
      message: "Request status updated successfully.",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Update certificate request status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while updating request status.",
    });
  }
};
 
module.exports = {
  createCertificateRequest,
  getAllCertificateRequests,
  getCertificateRequestById,
  updateCertificateRequestStatus,
};
 