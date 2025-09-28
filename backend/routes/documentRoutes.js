const express = require("express");
const router = express.Router();
const {
  uploadDocument,
  getDocumentsByCollege,
  getDocumentsByUser,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");
const { verifyFirebaseToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/upload", verifyFirebaseToken, ...uploadDocument);
router.get("/college", verifyFirebaseToken, verifyAdmin, getDocumentsByCollege);
router.get("/user", verifyFirebaseToken, getDocumentsByUser);
router.get("/:documentId", verifyFirebaseToken, getDocumentById);
router.put("/:documentId", verifyFirebaseToken, updateDocument);
router.delete("/:documentId", verifyFirebaseToken, deleteDocument);

module.exports = router;
