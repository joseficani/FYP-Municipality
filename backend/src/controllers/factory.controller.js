const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

const getAll = (Model) => async (req, res, next) => {
  try {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    next(err);
  }
};

const getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };
