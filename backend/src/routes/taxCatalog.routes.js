const express = require("express");
const router = express.Router();
const {
  getAllTaxes,
  getAllTaxesForAdmin,
  getTaxById,
  createTax,
  updateTax,
  deleteTax,
} = require("../controllers/taxCatalog.controller");

router.get("/", getAllTaxes);
router.get("/admin/all", getAllTaxesForAdmin);
router.get("/:id", getTaxById);
router.post("/", createTax);
router.put("/:id", updateTax);
router.delete("/:id", deleteTax);

module.exports = router;