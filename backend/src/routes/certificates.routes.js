const express = require("express");
const router = express.Router();
 
const {
  createCertificateRequest,
  getAllCertificateRequests,
  getCertificateRequestById,
  updateCertificateRequestStatus,
} = require("../controllers/certificates.controller");
 
const uploadCertificates = require("../middlewares/uploadCertificates");
 
router.post("/", uploadCertificates.array("documents", 5), createCertificateRequest);
router.get("/", getAllCertificateRequests);
router.get("/:id", getCertificateRequestById);
router.patch("/:id/status", updateCertificateRequestStatus);
 
module.exports = router;
 