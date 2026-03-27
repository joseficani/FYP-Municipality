const TaxCatalog = require("../models/TaxCatalog");

const getAllTaxes = async (req, res) => {
  try {
    const taxes = await TaxCatalog.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: taxes,
    });
  } catch (error) {
    console.error("getAllTaxes error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch taxes catalog.",
    });
  }
};

const getAllTaxesForAdmin = async (req, res) => {
  try {
    const taxes = await TaxCatalog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: taxes,
    });
  } catch (error) {
    console.error("getAllTaxesForAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch taxes catalog for admin.",
    });
  }
};

const getTaxById = async (req, res) => {
  try {
    const tax = await TaxCatalog.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: "Tax / Fee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: tax,
    });
  } catch (error) {
    console.error("getTaxById error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tax / fee.",
    });
  }
};

const createTax = async (req, res) => {
  try {
    const {
      title,
      arabicTitle,
      category,
      categoryTitle,
      categoryArabicTitle,
      description,
      conditions,
      requiredDocuments,
      paymentPeriod,
      estimatedAmount,
      notes,
      isActive,
    } = req.body;

    if (!title || !category || !categoryTitle || !description) {
      return res.status(400).json({
        success: false,
        message: "title, category, categoryTitle, and description are required.",
      });
    }

    const tax = await TaxCatalog.create({
      title,
      arabicTitle: arabicTitle || "",
      category,
      categoryTitle,
      categoryArabicTitle: categoryArabicTitle || "",
      description,
      conditions: conditions || "",
      requiredDocuments: Array.isArray(requiredDocuments)
        ? requiredDocuments
        : [],
      paymentPeriod: paymentPeriod || "",
      estimatedAmount: estimatedAmount || "",
      notes: notes || "",
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Tax / Fee created successfully.",
      data: tax,
    });
  } catch (error) {
    console.error("createTax error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create tax / fee.",
    });
  }
};

const updateTax = async (req, res) => {
  try {
    const {
      title,
      arabicTitle,
      category,
      categoryTitle,
      categoryArabicTitle,
      description,
      conditions,
      requiredDocuments,
      paymentPeriod,
      estimatedAmount,
      notes,
      isActive,
    } = req.body;

    const tax = await TaxCatalog.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: "Tax / Fee not found.",
      });
    }

    tax.title = title ?? tax.title;
    tax.arabicTitle = arabicTitle ?? tax.arabicTitle;
    tax.category = category ?? tax.category;
    tax.categoryTitle = categoryTitle ?? tax.categoryTitle;
    tax.categoryArabicTitle = categoryArabicTitle ?? tax.categoryArabicTitle;
    tax.description = description ?? tax.description;
    tax.conditions = conditions ?? tax.conditions;
    tax.requiredDocuments = Array.isArray(requiredDocuments)
      ? requiredDocuments
      : tax.requiredDocuments;
    tax.paymentPeriod = paymentPeriod ?? tax.paymentPeriod;
    tax.estimatedAmount = estimatedAmount ?? tax.estimatedAmount;
    tax.notes = notes ?? tax.notes;
    tax.isActive =
      typeof isActive === "boolean" ? isActive : tax.isActive;

    const updatedTax = await tax.save();

    return res.status(200).json({
      success: true,
      message: "Tax / Fee updated successfully.",
      data: updatedTax,
    });
  } catch (error) {
    console.error("updateTax error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update tax / fee.",
    });
  }
};

const deleteTax = async (req, res) => {
  try {
    const tax = await TaxCatalog.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: "Tax / Fee not found.",
      });
    }

    await TaxCatalog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Tax / Fee deleted successfully.",
    });
  } catch (error) {
    console.error("deleteTax error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete tax / fee.",
    });
  }
};

module.exports = {
  getAllTaxes,
  getAllTaxesForAdmin,
  getTaxById,
  createTax,
  updateTax,
  deleteTax,
};