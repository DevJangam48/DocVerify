const { createAdmin, getAdminById } = require("../models/adminModel");
const { getStudentById } = require("../models/studentModel");
const {
  getDocumentsByUserId,
  getDocumentsByCollegeId,
  getDocumentById,
  updateDocumentById,
} = require("../models/documentModel");

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.registerAdmin = async (req, res) => {
  try {
    // Get UID and email securely from the decoded token (from middleware)
    const userId = req.user.uid;
    const email = req.user.email; // Get the rest of the profile data from the form body

    const { name, prn, collegeName, collegeId, additionalInfo } = req.body; // Construct the data payload, ensuring email and userID are from the server

    const adminProfile = {
      userID: userId,
      email: email,
      name,
      prn,
      collegeName,
      collegeId,
      additionalInfo: additionalInfo || "",
      createdAt: new Date().toISOString(),
    };

    await createAdmin(adminProfile);

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

// Controller for approving/rejecting document
exports.adminUpdateDocumentStatus = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { status, remark } = req.body;

    // This comes from your verifyAdmin middleware
    const adminCollegeId = req.user.collegeId;

    // 1. Basic status validation
    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // 2. Fetch the document first to check permissions
    const documentToUpdate = await getDocumentById(documentId);
    console.log("Admin's college ID:", adminCollegeId);
    console.log("Document to update:", documentToUpdate);
    if (!documentToUpdate) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 3. 🔐 SECURITY CHECK: Ensure the admin and document belong to the same college
    if (documentToUpdate.collegeId !== adminCollegeId) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to modify this document.",
      });
    }

    // 4. If the check passes, proceed with the update
    const updatePayload = {
      status,
      remark: remark || "",
      reviewedAt: new Date().toISOString(),
      reviewedBy: req.user.uid, // Good practice to log which admin reviewed it
    };

    const updatedDocument = await updateDocumentById(documentId, updatePayload);

    res.status(200).json({
      message: "Status updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
    console.error("❌ Error updating document status:", error);
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};

exports.sendStudentStatusEmail = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch student and document details
    const student = await getStudentById(studentId);
    const documents = await getDocumentsByUserId(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Compose the email content (HTML)
    const subject = "Update on Your Document Verification";
    const documentListHtml = documents
      .map(
        (doc) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${doc.s3Key
            .split("/")
            .pop()}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-transform: capitalize;">${
            doc.status
          }</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            doc.remark || ""
          }</td>
        </tr>`
      )
      .join("");

    const htmlBody = `
      <h1>Document Status Update</h1>
      <p>Hello ${student.name.split(" ")[0]},</p>
      <p>Here is the current status of your uploaded documents:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">File Name</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Status</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Admin Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${documentListHtml}
        </tbody>
      </table>
      <p>If any documents are rejected, please delete them and upload a corrected version.</p>
      <p>Thank you.</p>
      <p>Note: This is an auto-generated email. Please do not reply.</p>
    `;

    // ✅ 3. Send the email using Resend
    await resend.emails.send({
      from: "DocVerify System <onboarding@resend.dev>", // Use this for testing
      to: student.email,
      subject: subject,
      html: htmlBody,
    });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("❌ Error sending status email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
