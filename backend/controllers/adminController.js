const { createAdmin, getAdminById } = require("../models/adminModel");
const { getStudentById } = require("../models/studentModel");
const {
  getDocumentsByUserId,
  getDocumentsByCollegeId,
} = require("../models/documentModel");

exports.registerAdmin = async (req, res) => {
  try {
    const data = req.body;

    await createAdmin({
      ...data,
      userID: data.userID,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "✅ Admin registered successfully" });
  } catch (error) {
    console.error("❌ Error in registerAdmin:", error);
    res.status(500).json({ error: "❌ Failed to register admin" });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const { userID } = req.params;
    const admin = await getAdminById(userID);
    if (!admin) return res.status(404).json({ error: "❌ Admin not found" });
    res.json(admin);
  } catch (error) {
    console.error("❌ Error in getAdmin:", error);
    res.status(500).json({ error: "❌ Failed to get admin" });
  }
};

exports.getStudentsForCollege = async (req, res) => {
  try {
    const collegeId = req.user.collegeId; // from verifyAdmin middleware
    if (!collegeId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Fetch all documents for the college
    const documents = await getDocumentsByCollegeId(collegeId);

    // Group documents by studentId and count documents
    const studentMap = documents.reduce((acc, doc) => {
      const studentId = doc.userId || doc.uploaderPRN;
      if (studentId) {
        if (!acc[studentId]) acc[studentId] = { studentId, documentCount: 1 };
        acc[studentId].documentCount++;
      }
      return acc;
    }, {});

    // For each student, fetch the details and map to desired output
    const studentList = await Promise.all(
      Object.keys(studentMap).map(async (studentId) => {
        const studentDetails = await getStudentById(studentId);
        return {
          userID: studentId,
          name: studentDetails?.name || "Unknown",
          email: studentDetails?.email || "Unknown",
          prnNo: studentDetails?.prn || "Unknown",
          documentCount: studentMap[studentId].documentCount,
        };
      })
    );

    // Return student list with name, email, prnNo, and document count
    res.json(studentList);
  } catch (error) {
    console.error("Error fetching students preview:", error);
    res.status(500).json({ error: "Failed to fetch students preview" });
  }
};

// Get documents uploaded by a particular student
exports.getDocumentsOfStudent = async (req, res) => {
  try {
    const { userId } = req.params;
    // Optional: add authorization check that this user belongs to admin's college
    const documents = await getDocumentsByUserId(userId);
    res.json(documents);
  } catch (error) {
    console.error("Error fetching student documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

exports.getStudentByIdController = async (req, res) => {
  try {
    const { userID } = req.params;
    const student = await getStudentById(userID);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Error fetching student details" });
  }
};
