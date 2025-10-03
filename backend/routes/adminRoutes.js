const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  getAdmin,
  getStudentsForCollege,
  getDocumentsOfStudent,
  getStudentByIdController,
  adminUpdateDocumentStatus,
} = require("../controllers/adminController");
const { verifyFirebaseToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyFirebaseToken, verifyAdmin, registerAdmin);
router.get(
  "/students",
  verifyFirebaseToken,
  verifyAdmin,
  getStudentsForCollege
);

router.get(
  "/student/:userID",
  verifyFirebaseToken,
  verifyAdmin,
  getStudentByIdController
);

router.get("/:userID", verifyFirebaseToken, verifyAdmin, getAdmin);

router.get(
  "/:userId/documents",
  verifyFirebaseToken,
  verifyAdmin,
  getDocumentsOfStudent
);

router.put(
  "/documents/:documentId/status",
  verifyFirebaseToken,
  verifyAdmin,
  adminUpdateDocumentStatus
);

module.exports = router;
