const {
  createDocument,
  getDocumentById,
  getDocumentsByCollegeId,
  getDocumentsByUserId,
  updateDocumentById,
  deleteDocumentById,
} = require("../models/documentModel");
const { getPresignedUrl } = require("../utils/awsS3Helper");
const { s3 } = require("../config/aws");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { getStudentById } = require("../models/studentModel");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const upload = multer();

// Upload a single document
exports.uploadDocument = [
  upload.single("document"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: "No file uploaded" });

      const userId = req.user.uid;
      const studentProfile = await getStudentById(userId);
      if (!studentProfile || !studentProfile.collegeId) {
        return res
          .status(400)
          .json({ message: "Could not find college for this student." });
      }
      const collegeId = studentProfile.collegeId;

      const documentId = uuidv4();
      const fileKey = `students/${req.user.uid}/${documentId}_${file.originalname}`;

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const s3Result = await s3.upload(params).promise();

      await createDocument({
        document_id: documentId,
        userId: userId,
        collegeId: collegeId,
        s3Key: fileKey,
        s3Url: s3Result.Location,
        status: "pending",
        uploadedAt: new Date().toISOString(),
      });

      res.status(200).json({
        message: "Document uploaded",
        documentId,
        s3Url: s3Result.Location,
      });
    } catch (error) {
      console.error("❌ Error uploading document: ", error);
      res.status(500).json({ error: "Failed to upload document" });
    }
  },
];

// Get documents by collegeId (via GSI)
exports.getDocumentsByCollege = async (req, res) => {
  try {
    // Assuming req.user.collegeId is set by authentication middleware or controller logic
    const collegeId = req.user.collegeId;
    if (!collegeId)
      return res
        .status(403)
        .json({ error: "Unauthorized: College ID missing" });

    const documents = await getDocumentsByCollegeId(collegeId);
    res.json(documents);
  } catch (error) {
    console.error("❌ Error getting documents: ", error);
    res.status(500).json({ error: "Failed to get documents" });
  }
};

// Get documents by userId (via GSI)
exports.getDocumentsByUser = async (req, res) => {
  try {
    const userId = req.user.uid; // Extract user ID from authorized request
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    const documents = await getDocumentsByUserId(userId);

    // Inject pre-signed URLs for each document
    const docsWithUrls = documents.map((doc) => {
      return {
        ...doc,
        s3Url: getPresignedUrl(BUCKET_NAME, doc.s3Key),
      };
    });

    res.json(docsWithUrls);
  } catch (error) {
    console.error("❌ Error getting documents by user: ", error);
    res.status(500).json({ error: "Failed to get user documents" });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const userId = req.user.uid; // Extract user ID from verified token
    const documentId = req.params.id;

    if (!documentId)
      return res.status(400).json({ error: "Document ID required" });

    const document = await getDocumentById(documentId);
    if (!document) return res.status(404).json({ error: "Document not found" });

    // Check ownership for security
    if (document.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this document" });
    }

    // Attach pre-signed URL for secure temporary access
    document.s3Url = getPresignedUrl(BUCKET_NAME, document.s3Key);
    res.json(document);
  } catch (error) {
    console.error("Error in getDocumentById:", error);
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

// A new helper function for S3 deletion
const deleteS3Object = (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

// Delete a document controller
exports.deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    // 1. Get the document details, including the s3Key
    const existingDoc = await getDocumentById(documentId);
    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 2. Delete the file from S3
    if (existingDoc.s3Key) {
      await deleteS3Object(existingDoc.s3Key);
    }

    // 3. Delete the record from DynamoDB
    await deleteDocumentById(documentId);

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting document: ", error);
    res
      .status(500)
      .json({ message: "Failed to delete document", error: error.message });
  }
};
