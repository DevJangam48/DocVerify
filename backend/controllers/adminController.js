const { createAdmin, getAdminById } = require("../models/adminModel");
const { getStudentsByCollegeId } = require("../models/studentModel");
const { getDocumentsByUserId } = require("../models/documentModel");

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
    console.log("✅ user Id: ", userID);
    const admin = await getAdminById(userID);
    if (!admin) return res.status(404).json({ error: "❌ Admin not found" });
    res.json(admin);
  } catch (error) {
    console.error("❌ Error in getAdmin:", error);
    res.status(500).json({ error: "❌ Failed to get admin" });
  }
};
// Get all students by college for admin
exports.getStudentsForCollege = async (req, res) => {
  try {
    const collegeId = req.user.collegeId; // from verifyAdmin middleware
    if (!collegeId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const students = await getStudentsByCollegeId(collegeId);
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
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
