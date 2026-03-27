const express = require("express");
const router = express.Router();
const {
  translateText,
  translateBatchText,
} = require("../controllers/translateController");

router.post("/", translateText);
router.post("/batch", translateBatchText);

module.exports = router;