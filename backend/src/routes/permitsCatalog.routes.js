const express = require("express");
const router = express.Router();

const {
  getAllPermits,
  getPermitById,
  createPermit,
  updatePermit,
  deletePermit,
} = require("../controllers/permitsCatalog.controller");

const { protect, adminOnly } = require("../middlewares/auth.middleware");

router.get("/", getAllPermits);
router.get("/:id", getPermitById);

router.post("/", protect, adminOnly, createPermit);
router.put("/:id", protect, adminOnly, updatePermit);
router.delete("/:id", protect, adminOnly, deletePermit);

module.exports = router;