const News = require("../models/news.model");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("getAllNews error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("getNewsById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch news item",
      error: error.message,
    });
  }
};

exports.createNews = async (req, res) => {
  try {
    const item = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: item,
    });
  } catch (error) {
    console.error("createNews error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create news",
      error: error.message,
    });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const item = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("updateNews error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update news",
      error: error.message,
    });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const item = await News.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("deleteNews error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete news",
      error: error.message,
    });
  }
};