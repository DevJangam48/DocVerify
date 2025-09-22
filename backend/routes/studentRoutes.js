const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getStudent,
} = require("../controllers/studentController");
const { verifyFirebaseToken } = require("../middleware/authMiddleware");

router.post("/", verifyFirebaseToken, registerStudent);
router.get("/:userID", verifyFirebaseToken, getStudent);

module.exports = router;
