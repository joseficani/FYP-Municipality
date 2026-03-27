const express = require("express");
const router = express.Router();

const {
  createPermitRequest,
  getAllPermitRequests,
  getMyPermitRequests,
  getPermitRequestById,
  updatePermitRequestStatus,
} = require("../controllers/permits.controller");

const uploadPermitDocuments = require("../middlewares/uploadPermitDocuments");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

router.post(
  "/",
  protect,
  uploadPermitDocuments.array("documents", 10),
  createPermitRequest
);

router.get("/my", protect, getMyPermitRequests);
router.get("/", protect, adminOnly, getAllPermitRequests);
router.get("/:id", protect, adminOnly, getPermitRequestById);

router.put("/:id/status", protect, adminOnly, updatePermitRequestStatus);

module.exports = router;