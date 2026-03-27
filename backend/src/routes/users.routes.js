const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  getMyActivities,
} = require("../controllers/users.controller");

const { protect } = require("../middlewares/auth.middleware");

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.get("/me/activities", protect, getMyActivities);

module.exports = router;