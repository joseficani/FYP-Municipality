const Permit = require("../models/permit.model");

const getAllPermits = async (req, res) => {
  try {
    const permits = await Permit.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: permits.length,
      data: permits,
    });
  } catch (error) {
    console.error("Get permits catalog error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching permits.",
    });
  }
};

const getPermitById = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        success: false,
        message: "Permit not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: permit,
    });
  } catch (error) {
    console.error("Get permit by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching permit.",
    });
  }
};

const createPermit = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      processingTime,
      requiredDocuments,
      requiresLocation,
      iconName,
      isActive,
    } = req.body;

    if (!title || !description || !processingTime) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const permit = await Permit.create({
      title,
      description,
      category: category || "other",
      processingTime,
      requiredDocuments: Array.isArray(requiredDocuments)
        ? requiredDocuments
        : [],
      requiresLocation:
        typeof requiresLocation === "boolean" ? requiresLocation : true,
      iconName: iconName || "FileText",
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Permit created successfully.",
      data: permit,
    });
  } catch (error) {
    console.error("Create permit error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating permit.",
    });
  }
};

const updatePermit = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      processingTime,
      requiredDocuments,
      requiresLocation,
      iconName,
      isActive,
    } = req.body;

    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        success: false,
        message: "Permit not found.",
      });
    }

    permit.title = title ?? permit.title;
    permit.description = description ?? permit.description;
    permit.category = category ?? permit.category;
    permit.processingTime = processingTime ?? permit.processingTime;
    permit.requiredDocuments = Array.isArray(requiredDocuments)
      ? requiredDocuments
      : permit.requiredDocuments;
    permit.requiresLocation =
      typeof requiresLocation === "boolean"
        ? requiresLocation
        : permit.requiresLocation;
    permit.iconName = iconName ?? permit.iconName;
    permit.isActive = typeof isActive === "boolean" ? isActive : permit.isActive;

    const updatedPermit = await permit.save();

    return res.status(200).json({
      success: true,
      message: "Permit updated successfully.",
      data: updatedPermit,
    });
  } catch (error) {
    console.error("Update permit error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating permit.",
    });
  }
};

const deletePermit = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        success: false,
        message: "Permit not found.",
      });
    }

    await permit.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Permit deleted successfully.",
    });
  } catch (error) {
    console.error("Delete permit error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting permit.",
    });
  }
};

module.exports = {
  getAllPermits,
  getPermitById,
  createPermit,
  updatePermit,
  deletePermit,
};